# Importations
from django.contrib.auth.models import User
from django.db import models

from email.mime.text import MIMEText

from django.utils import timezone
from polymorphic.models import PolymorphicModel

# Create your models here.
class Contact(PolymorphicModel):
    # Champs
    nom   = models.CharField(max_length=1024)
    email = models.EmailField(max_length=512, unique=True)

    quota = models.IntegerField(default=-1, help_text="valeur inférieure 0 pour quota infini")
    max_quota = models.IntegerField(default=-1)
    per_query_quota = models.IntegerField(default=0)
    last_reset = models.DateTimeField(null=True, blank=True)
    reset_delta = models.DurationField(null=True, blank=True)

    # Méthodes spéciales
    def __str__(self):
        return self.nom

    # Méthodes
    def has_quota(self):
        self.refresh_from_db()
        return self.quota < 0 or self.quota >= self.per_query_quota

    def use_quota(self):
        if self.quota != -1:
            self.quota -= self.per_query_quota
            self.save()

    def reset_quota(self):
        self.refresh_from_db()
        if timezone.now() > self.last_reset + self.reset_delta:
            self.quota = self.max_quota
            self.last_reset = timezone.now()

            self.save()

    def send_mail(self, mail: MIMEText, message: 'Message'):
        if self.has_quota():
            self._send_mail(mail, message)
            self.use_quota()

    def _send_mail(self, mail: MIMEText, message: 'Message'):
        print("Send mail {}".format(mail["subject"]))

class SendQueue(PolymorphicModel):
    # Champs
    date    = models.DateTimeField(auto_now_add=True)
    message = models.ForeignKey('sender.Message', models.CASCADE, related_name='+')

    # Méta
    class Meta:
        verbose_name = "file d'envoi"
        verbose_name_plural = "file d'envoi"

    # Méthodes
    def send(self):
        msg = self.message

        msg.sender.reset_quota()
        if msg.sender.has_quota():
            if not isinstance(msg, Template):
                msg.send()

            self.delete()

class Message(PolymorphicModel):
    # Constantes
    ATTENTE = 1; ENVOI_EN_COURS = 2; ENVOYE = 3
    STATUS = (
        (ATTENTE,        "Attente"),
        (ENVOI_EN_COURS, "Envoi en cours"),
        (ENVOYE,         "Envoyé")
    )

    send_queue = SendQueue

    # Champs
    sender = models.ForeignKey(Contact, models.CASCADE)
    status = models.SmallIntegerField(choices=STATUS, default=ATTENTE)

    objet   = models.CharField(max_length=2048)
    message = models.TextField()

    # Méthodes spéciales
    def __str__(self):
        return "{}: {}".format(self.sender, self.objet)

    # Méthodes
    def create_send_queue(self) -> 'SendQueue':
        return self.send_queue(message=self)

    def to_mime_text(self) -> MIMEText:
        mail = MIMEText(self.message)
        mail['from'] = self.sender.email
        mail['subject'] = self.objet

        return mail

    def send(self):
        self.sender.send_mail(self.to_mime_text(), self)

        # Changement de status
        self.status = Message.ENVOYE
        self.save()

class Mail(Message):
    # Champs
    clients = models.ManyToManyField(Contact, related_name='+')

    # Méthodes
    def to_mime_text(self):
        mail = super(Mail, self).to_mime_text()
        mail['to'] = ', '.join(c.email for c in self.clients.all())

        return mail

class ListeEnvoi(models.Model):
    # Champs
    nom = models.CharField(max_length=1024)
    contacts = models.ManyToManyField(Contact)

    # Méta
    class Meta:
        verbose_name = "liste d'envois"
        verbose_name_plural = "listes d'envois"

    # Méthodes spéciales
    def __str__(self):
        return self.nom

class SendQueueTemplate(SendQueue):
    # Champs
    clients = models.ManyToManyField(Contact, related_name='+')

    # Méthodes
    def send(self):
        msg = self.message

        # Au cas ou ...
        if not isinstance(msg, Template):
            return super(SendQueueTemplate, self).send()

        # Manage quota
        msg.sender.reset_quota()
        if msg.sender.has_quota():
            # Envois !
            sentlist = []

            try:
                # Envoi
                for contact in self.clients.all():
                    msg.send(contact)
                    sentlist.append(contact)

                    if not msg.sender.has_quota():
                        break

                # Suppression des clients
                self.clients.remove(*sentlist)

                # Mise à jour du message
                msg.messages_sent += len(sentlist)
                if self.clients.count() == 0:
                    msg.status = Message.ENVOYE
                    self.delete()

                msg.save()

            except Exception:
                # Suppression des clients
                self.clients.remove(*sentlist)

                # Mise à jour du message
                msg.messages_sent += len(sentlist)
                msg.save()

                raise

class Template(Message):
    # Constantes
    send_queue = SendQueueTemplate

    # Champs
    listes = models.ManyToManyField(ListeEnvoi, related_name='+')
    messages_sent = models.PositiveIntegerField(default=0)

    # Méthodes
    def create_send_queue(self) -> 'SendQueue':
        sqt: SendQueueTemplate = super(Template, self).create_send_queue()
        sqt.save()

        for liste in self.listes.all():
            sqt.clients.add(*liste.contacts.all())

        return sqt

    def to_mime_text(self, contact: Contact):
        mail = super(Template, self).to_mime_text()
        mail['to'] = contact.email

        return mail

    def send(self, contact: Contact):
        self.sender.send_mail(self.to_mime_text(contact), self)
