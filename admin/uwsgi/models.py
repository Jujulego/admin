# Importations
from django.db import models

# Create your models here.
class Vassal(models.Model):
    # Enumérations
    FORMAT_CHOICES = (
        ('INI', '.ini'),
    )

    # Champs
    nom = models.CharField(max_length=50, null=False, unique=True)
    format = models.CharField(max_length=3, choices=FORMAT_CHOICES)
    config = models.TextField(null=False)
    date_modif = models.DateTimeField(auto_now=True, blank=True)
    actif = models.BooleanField(default=True, null=False, blank=True)

    # Meta
    class Meta:
        verbose_name_plural = "vassaux"