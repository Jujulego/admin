# Importations
from django.contrib import admin, messages
from django.contrib.admin.utils import quote
from django.urls import reverse
from django.utils import timezone
from django.utils.html import format_html
from django.utils.http import urlquote

from utils import AdminUtilsMixin
from .models import Vassal

# Register your models here.
@admin.register(Vassal)
class VassalAdmin(admin.ModelAdmin, AdminUtilsMixin):
    # Liste
    list_display = ("nom", "actif")
    list_filter = ("actif",)

    actions = ("start", "reload", "stop")

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

    # Actions
    def start(self, request, qs):
        # Filtrage
        qs = qs.filter(actif=False)

        # Message
        if qs.count() == 1:
            messages.info(request, format_html('Lancement de {}', self.link_repr(request, qs.first())))

        elif qs.count() > 1:
            messages.info(request, "Lancement de {} vassaux".format(qs.count()))

        # Activation !
        qs.update(actif=True, date_modif=timezone.now())

    start.short_description = "Lance les vassaux"

    def stop(self, request, qs):
        # Filtrage
        qs = qs.filter(actif=True)

        # Message
        if qs.count() == 1:
            messages.info(request, format_html('Arrêt de {}', self.link_repr(request, qs.first())))

        elif qs.count() > 1:
            messages.info(request, "Arrêt de {} vassaux".format(qs.count()))

        # Activation !
        qs.update(actif=False, date_modif=timezone.now())

    stop.short_description = "Arrête les vassaux"

    def reload(self, request, qs):
        # La mise à jour de la date force le relancement
        qs.update(date_modif=timezone.now())

        # Message
        if qs.count() == 1:
            messages.info(request, format_html('Relancement de {}', self.link_repr(request, qs.first())))

        elif qs.count() > 1:
            messages.info(request, "Relancement de {} vassaux".format(qs.count()))

    reload.short_description = "Relance les vassaux"