# Importations
import base64
import httplib2

from django.db import models

from apiclient import discovery, errors
from email.mime.text import MIMEText

from sender.models import Message, Contact

from .fields import CredentialsField

# Create your models here.
class CompteGoogle(models.Model):
    # Champs
    user_id = models.CharField(primary_key=True, max_length=64)
    credentials = CredentialsField()

    nom = models.CharField(max_length=1024)

    # Méthodes spéciales
    def __str__(self):
        return "{} ({})".format(self.nom, self.user_id)

    # Méthodes
    def build_service(self):
        http = httplib2.Http()
        http = self.credentials.authorize(http)
        return discovery.build("gmail", "v1", http=http)

    def create_mail(self, message: Message, client: Contact):
        mail = MIMEText(message.message)
        mail['to'] = client.email
        mail['from'] = self.nom
        mail['subject'] = message.objet

        return {'raw': base64.urlsafe_b64encode(mail.as_bytes()).decode()}

    def send_mail(self, message: Message, client: Contact):
        service = self.build_service()
        mail = self.create_mail(message, client)

        log = MailLog(message=message, client=client, sender=self)

        try:
            mail = service.users().messages().send(userId=self.nom, body=mail).execute()
            log.mail_id = mail['id']

        except errors.HttpError as error:
            log.erreur = str(error)

        finally:
            log.save()

class MailLog(models.Model):
    # Champs
    message = models.ForeignKey(Message, models.CASCADE)
    client  = models.ForeignKey(Contact, models.CASCADE)
    sender  = models.ForeignKey(CompteGoogle, models.CASCADE)

    mail_id = models.CharField(max_length=512, null=True)
    erreur  = models.TextField(null=True)
