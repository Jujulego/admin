# Importations
from django.contrib import admin
from django.db.models import QuerySet

from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin, PolymorphicChildModelFilter

from google_api.models import GmailContact

from .models import *

# Polymorphic base
class ContactChildAdmin(PolymorphicChildModelAdmin):
    # Base model
    base_model = Contact

# Register your models here.
@admin.register(Contact)
class ContactParentAdmin(PolymorphicParentModelAdmin):
    # Models
    base_model = Contact
    child_models = (GmailContact,)

    # Liste
    list_display = ("nom", "email")
    list_filter  = (PolymorphicChildModelFilter,)

@admin.register(ListeEnvoi)
class AdminListeEnvoi(admin.ModelAdmin):
    # Liste
    list_display = ("nom",)

    # Edition
    filter_horizontal = ("contacts",)

@admin.register(Message)
class AdminMessage(admin.ModelAdmin):
    # Liste
    actions = ("add_to_send_queue",)
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

    # Actions
    def add_to_send_queue(self, request, qs: QuerySet):
        qs = qs.filter(status=Message.ATTENTE)

        # Ajout à la queue
        SendQueue.objects.bulk_create([
            SendQueue(message=m) for m in qs
        ])

        # Marquage "envoi en cours"
        qs.update(status=Message.ENVOI_EN_COURS)

    add_to_send_queue.short_description = "Ajoute les message à la file d'envoi"

@admin.register(SendQueue)
class AdminSendQueue(admin.ModelAdmin):
    # Liste
    list_display = ("date", "message")

    # Méthodes
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False