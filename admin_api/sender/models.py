# Importations
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Contact(models.Model):
    # Champs
    nom = models.CharField(max_length=1024)
    email = models.EmailField(max_length=512, unique=True)

class ListeEnvoi(models.Model):
    # Champs
    nom = models.CharField(max_length=1024)
    contacts = models.ManyToManyField(Contact)

    # Méta
    class Meta:
        verbose_name = "liste d'envois"
        verbose_name_plural = "listes d'envois"
