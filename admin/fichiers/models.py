# Imporations
from django.db import models
from django.contrib.auth.models import User

import random

# Fonctions
def generate_filename(instance, filename):
    return "files/" + ("".join(random.choices("azertyuiopqsdfghjklmwxcvbn0123456789", k=40)))

# Create your models here.
class Objet(models.Model):
    # Attributs
    metadata = ("nom", "date_creation", "date_modification")

    # - champs
    nom = models.TextField(max_length=500)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    proprietaire = models.ForeignKey(User, models.CASCADE, null=False, blank=True)

    # Méthodes
    def get_metadata(self):
        return { n: getattr(self, n) for n in self.metadata }

    # Méta
    class Meta:
        abstract = True

class Dossier(Objet):
    # Attributs
    metadata = Objet.metadata + ("chemin",)

    # - champs
    parent = models.ForeignKey('self', models.CASCADE, null=True, blank=True, related_name="dossiers")

    # Propriété
    @property
    def is_racine(self):
        return self.parent is None

    @property
    def chemin(self):
        if self.is_racine:
            return "/" + self.nom + "/"

        return self.parent.chemin + self.nom + "/"

    # Méta
    class Meta(Objet.Meta):
        abstract = False
        unique_together = ("nom", "parent")

class Fichier(Objet):
    # Attributs
    metadata = Objet.metadata + ("chemin",)

    # - champs
    fichier = models.FileField(upload_to=generate_filename, null=False, blank=False)
    dossier = models.ForeignKey(Dossier, models.CASCADE, null=False, blank=False, related_name="fichiers")

    # Propriété
    @property
    def chemin(self):
        return self.dossier.chemin + self.nom

    # Méta
    class Meta(Objet.Meta):
        abstract = False
        unique_together = ("nom", "dossier")