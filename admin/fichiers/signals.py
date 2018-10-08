# Importations
from django.db.models.signals import post_delete
from django.dispatch import receiver

from .models import Fichier

# Signaux
@receiver(post_delete, sender=Fichier, dispatch_uid="fichiers.Fichier.post_delete")
def post_delete(sender, instance: Fichier, using, **kwargs):
    instance.fichier.delete(save=False)