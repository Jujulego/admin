# Importations
from django.contrib.auth.models import User
from django.db import models

from email.mime.text import MIMEText
from polymorphic.models import PolymorphicModel

# Create your models here.
class Contact(PolymorphicModel):
    # Champs
    nom   = models.CharField(max_length=1024)
    email = models.EmailField(max_length=512, unique=True)

    # Méthodes spéciales
    def __str__(self):
        return self.nom

    # Méthodes
    def send_mail(self, mail: MIMEText, message: 'Message'):
        pass

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

class Message(models.Model):
    # Constantes
    ATTENTE = 1; ENVOI_EN_COURS = 2; ENVOYE = 3
    STATUS = (
        (ATTENTE,        "Attente"),
        (ENVOI_EN_COURS, "Envoi en cours"),
        (ENVOYE,         "Envoyé")
    )

    # Champs
    sender  = models.ForeignKey(Contact, models.CASCADE)
    clients = models.ManyToManyField(Contact, related_name='+')
    status  = models.SmallIntegerField(choices=STATUS, default=ATTENTE)

    objet   = models.CharField(max_length=2048)
    message = models.TextField()

    # Méthodes spéciales
    def __str__(self):
        return "{}: {}".format(self.sender, self.objet)

    # Méthodes
    def to_mime_text(self) -> MIMEText:
        mail = MIMEText(self.message)
        mail['to'] = ', '.join(c.email for c in self.clients.all())
        mail['from'] = self.sender.email
        mail['subject'] = self.objet

        return mail

    def send(self):
        self.sender.send_mail(self.to_mime_text(), self)

        # Changement de status
        self.status = Message.ENVOYE
        self.save()

class SendQueue(models.Model):
    # Champs
    date    = models.DateTimeField(auto_now_add=True)
    message = models.ForeignKey(Message, models.CASCADE, related_name='+')

    # Méta
    class Meta:
        verbose_name = "file d'envoi"
        verbose_name_plural = "file d'envoi"