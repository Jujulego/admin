# Importations
from django.apps.registry import apps
from importlib import import_module

from .navbar import Position

# Contextes
def navbar(request):
    # Récupération des entrées
    items = []

    for conf in apps.get_app_configs():
        try:
            items.extend(
                import_module(conf.name + ".navbar").navbar
            )

        except ImportError:
            pass

    # Tri des entrées
    nav = {
        "top": [],
        "sidebar": [],
        "panel": [],
    }

    for it in items:
        if it["position"] == Position.TOP:
            nav["top"].append(it)

        elif it["position"] == Position.SIDEBAR:
            nav["sidebar"].append(it)

        elif it["position"] == Position.PANEL:
            nav["panel"].append(it)

    return { "navbar": nav }