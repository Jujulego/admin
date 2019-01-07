from django.contrib import admin

from sender.admin import ContactChildAdmin

from .models import GmailContact, GoogleAPI, MailLog

# Register your models here.
@admin.register(GoogleAPI)
class AdminGoogleAPI(admin.ModelAdmin):
    # Liste
    list_display = ("nom", "quota")

    # Edition
    readonly_fields = ("nom",)

@admin.register(GmailContact)
class AdminGmailContact(ContactChildAdmin):
    # Models
    base_model = GmailContact
    show_in_index = True

    # Liste
    list_display = ("nom", "email")

    # Edition
    exclude = ("credentials",)
    readonly_fields = ("user_id",)

    # Méthodes
    def has_add_permission(self, request):
        return False

@admin.register(MailLog)
class AdminMailLog(admin.ModelAdmin):
    # Liste
    date_hierarchy = "date"
    list_filter = ("status",)
    list_display = ("mail_id", "sender", "message", "status")

    # Edition
    fieldsets = (
        (None, {
            "fields": ("sender", "message")
        }),
        ("Resultat", {
            "classes": ("collapse",),
            "fields": (("date", "status"), ("mail_id", "erreur"))
        }),
    )

    # Méthodes
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False