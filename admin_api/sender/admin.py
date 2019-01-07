# Importations
from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Contact)
class AdminContact(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "email")

@admin.register(ListeEnvoi)
class AdminListeEnvoi(admin.ModelAdmin):
    # Liste
    list_display = ("nom",)

    # Edition
    filter_horizontal = ("contacts",)

@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    # Liste
    list_display = ("objet", "sender")

    # Edition
    fieldsets = (
        (None, {
            "fields": ("sender", ("client", "clients"))
        }),
        ("Message", {
            "fields": ("objet", "message")
        }),
    )
