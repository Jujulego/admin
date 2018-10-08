# Importations
from django.contrib import admin
from .models import Fichier, Dossier

# Register your models here.
@admin.register(Dossier)
class DossierAdmin(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "date_modification")

@admin.register(Fichier)
class FichierAdmin(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "date_modification")