# Importations
from django.contrib import admin

from .models import Vassal

# Register your models here.
@admin.register(Vassal)
class VassalAdmin(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "actif")
    list_filter = ("actif",)

    # Edition
    fieldsets = (
        (None, {
            "fields": (("nom", "actif"), "date_modif"),
        }),
        ("Config", {
            "fields": ("format", "config"),
        }),
    )

    readonly_fields = ("date_modif",)