# Importations
from django.contrib.admin.utils import quote
from django.urls import reverse
from django.utils.html import format_html
from django.utils.http import urlquote

# Classe
class AdminUtilsMixin:
    # Méthodes
    def link_repr(self, request, obj):
        if self.has_view_or_change_permission(request, obj):
            url = reverse(
                "admin:%s_%s_change" % (obj._meta.app_label, obj._meta.model_name),
                args=(quote(obj.pk),),
                current_app=self.admin_site.name
            )

            return format_html('<a href="{}">{}</a>', urlquote(url), obj)

        else:
            return str(obj)