# Importations
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Contact(models.Model):
    # Champs
    nom = models.CharField(max_length=1024)
    email = models.EmailField(max_length=512, unique=True)

    google = models.ForeignKey('google_api.CompteGoogle', models.SET_NULL, null=True, blank=True)

    # Méthodes spéciales
    def __str__(self):
        return self.nom

    # Méthodes
    def send_mail(self, message: 'Message', client: 'Contact'):
        if self.google is not None:
            self.google.send_mail(message, client)

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
    # Champs
    sender  = models.ForeignKey(Contact, models.CASCADE)
    client  = models.ForeignKey(Contact, models.SET_NULL, null=True, blank=True, related_name="+")
    clients = models.ForeignKey(ListeEnvoi, models.SET_NULL, null=True, blank=True)

    objet   = models.CharField(max_length=2048)
    message = models.TextField()

    # Méthodes spéciales
    def __str__(self):
        return "{}: {}".format(self.sender, self.objet)