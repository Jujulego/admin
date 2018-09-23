# Importations
from django.contrib import admin

from .models import *

# Register your models here.
@admin.register(Vassal)
class VassalAdmin(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "actif")
    list_filter = ("actif",)