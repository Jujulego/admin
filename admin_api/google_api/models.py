# Importations
from django.db import models

from .fields import CredentialsField

# Create your models here.
class CompteGoogle(models.Model):
    # Champs
    user_id = models.CharField(primary_key=True, max_length=64)
    credentials = CredentialsField()

    nom = models.CharField(max_length=1024)
