# Importations
import base64
import httplib2

from django.db import models

from apiclient import discovery, errors
from email.mime.text import MIMEText

from google_api.exceptions import OutOfQuota
from sender.models import Contact, Message

from .fields import CredentialsField

# Create your models here.
class GoogleAPI(models.Model):
    # Champs
    nom = models.CharField(max_length=512, unique=True)

    quota = models.BigIntegerField()
    limite = models.BigIntegerField() # Limite max d'utilisation

    # Méta
    class Meta:
        verbose_name = "Google API"

    # Méthodes spéciales
    def __str__(self):
        return self.nom

    # Méthodes
    def assert_quota(self):
        self.refresh_from_db()
        if self.quota >= self.limite:
            raise OutOfQuota(self)

    def use_quota(self, pts):
        self.quota += pts
        self.save()

class GmailContact(Contact):
    # Champs
    user_id = models.CharField(max_length=64, unique=True, db_index=True)
    credentials = CredentialsField()

    # Méthodes
    def build_service(self):
        http = httplib2.Http()
        http = self.credentials.authorize(http)
        return discovery.build("gmail", "v1", http=http)

    def prepare_mail(self, mail: MIMEText):
        return {'raw': base64.urlsafe_b64encode(mail.as_bytes()).decode()}

    def _send_mail(self, mail: MIMEText, message: Message):
        # Check quota !
        api = GoogleAPI.objects.get(nom="gmail")
        api.assert_quota()

        # Prepare sending
        service = self.build_service()
        mail    = self.prepare_mail(mail)

        log = MailLog(message=message, sender=self, api=api)

        try:
            mail = service.users().messages().send(userId=self.nom, body=mail).execute()

            # Log & update quota
            api.use_quota(100)

            log.status = MailLog.SUCCES
            log.mail_id = mail['id']

        except errors.HttpError as error:
            log.status = MailLog.ERREUR
            log.erreur = str(error)

        finally:
            log.save()

# - logs
class AbstractLog(models.Model):
    # Constantes
    SUCCES = "S"; ERREUR = "E"
    STATUS = (
        (SUCCES, "Succès"),
        (ERREUR, "Erreur"),
    )

    # Champs
    api  = models.ForeignKey(GoogleAPI, models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2, choices=STATUS)

    # Méta
    class Meta:
        abstract = True

class MailLog(AbstractLog):
    # Champs
    message = models.ForeignKey(Message, models.CASCADE)
    sender  = models.ForeignKey(GmailContact, models.CASCADE)

    mail_id = models.CharField(max_length=512, null=True)
    erreur  = models.TextField(null=True)

    # Méthodes spéciales
    def __str__(self):
        return "MailLog ({})".format(self.date)
