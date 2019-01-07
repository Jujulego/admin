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
    list_display = ("objet", "sender", "status")

    # Edition
    fieldsets = (
        (None, {
            "fields": ("sender", "clients", "status")
        }),
        ("Message", {
            "fields": ("objet", "message")
        }),
    )

    filter_horizontal = ("clients",)
    readonly_fields = ("status",)

@admin.register(SendQueue)
class AdminSendQueue(admin.ModelAdmin):
    # Liste
    list_display = ("date", "message")

    # Méthodes
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False