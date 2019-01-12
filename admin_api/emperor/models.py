# Importations
from django.db import models

# Create your models here.
class Vassal(models.Model):
    # Enumérations
    FORMAT_CHOICES = (
        ('.ini',  'INI'),
        ('.json', 'JSON'),
        ('.xml',  'XML'),
        ('.yaml', 'YAML'),
    )

    # Champs
    nom = models.CharField(max_length=50, null=False, unique=True)
    actif = models.BooleanField(default=False, null=False, blank=True)
    date_modif = models.DateTimeField(auto_now=True, blank=True)

    format = models.CharField(max_length=5, choices=FORMAT_CHOICES)
    config = models.TextField(null=False)

    # Meta
    class Meta:
        verbose_name_plural = "vassaux"

    # Méthodes spéciales
    def __str__(self):
        return self.nom.capitalize()