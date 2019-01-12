# Importations
from django.contrib import admin, messages
from django.db.models import QuerySet
from django.utils.html import format_html

from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin, PolymorphicChildModelFilter
from polymorphic.query import PolymorphicQuerySet

from google_api.models import GmailContact
from utils import AdminUtilsMixin

from .models import *

# Polymorphic base
class ContactChildAdmin(PolymorphicChildModelAdmin):
    # Base model
    base_model = Contact

    # Edition
    fieldsets = (
        (None, {
            "fields": ("nom", "email")
        }),
        ("Quota", {
            "fields": (("quota", "per_query_quota", "max_quota"), ("last_reset", "reset_delta"))
        }),
    )

class MessageChildAdmin(PolymorphicChildModelAdmin):
    # Base model
    base_model = Message

# Register your models here.
@admin.register(Contact)
class ContactParentAdmin(PolymorphicParentModelAdmin):
    # Models
    base_model = Contact
    child_models = (Contact, GmailContact)

    # Liste
    list_display = ("nom", "email")
    list_filter  = (PolymorphicChildModelFilter,)

    # Edition
    fieldsets = (
        (None, {
            "fields": ("nom", "email")
        }),
        ("Quota", {
            "fields": (("quota", "per_query_quota", "max_quota"), ("last_reset", "reset_delta"))
        }),
    )

@admin.register(ListeEnvoi)
class AdminListeEnvoi(admin.ModelAdmin):
    # Liste
    list_display = ("nom",)

    # Edition
    filter_horizontal = ("contacts",)

@admin.register(Message)
class AdminMessage(PolymorphicParentModelAdmin, AdminUtilsMixin):
    # Models
    base_model = Message
    child_models = (Mail, Template)

    # Liste
    actions = ("add_to_send_queue",)

    list_display = ("objet", "sender", "status")
    list_filter  = (PolymorphicChildModelFilter,)

    # Actions
    def add_to_send_queue(self, request, qs: PolymorphicQuerySet):
        qs = qs.filter(status=Message.ATTENTE)

        # Ajout à la queue
        sq_items = [m.create_send_queue() for m in qs.get_real_instances()]
        SendQueue.objects.bulk_create(sq for sq in sq_items if sq.pk is None)

        # Marquage "envoi en cours"
        qs.update(status=Message.ENVOI_EN_COURS)

        # Message
        if qs.count() == 1:
            messages.info(request, format_html('Envoi de {}', self.link_repr(request, qs.first())))

        elif qs.count() > 1:
            messages.info(request, "Envoi de {} messages".format(qs.count()))

    add_to_send_queue.short_description = "Ajoute le(s) message(s) à la file d'envoi"

@admin.register(Mail)
class MailAdmin(MessageChildAdmin):
    # Model
    base_model = Mail

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

@admin.register(Template)
class TemplateAdmin(MessageChildAdmin):
    # Model
    base_model = Template

    # Edition
    fieldsets = (
        (None, {
            "fields": ("sender", "listes", "status")
        }),
        ("Message", {
            "fields": ("objet", "message")
        }),
    )

    filter_horizontal = ("listes",)
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