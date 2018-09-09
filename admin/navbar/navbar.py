# Importations
from django.urls import reverse

# Enumérations
class Position:
    TOP = 0
    SIDEBAR = 1
    PANEL = 2

# Classe
def item(name, icon, position = Position.SIDEBAR, **kwargs):
    base = {
        "name": name,
        "icon": icon,
        "position": position,

        "is_modal": False
    }

    base.update(kwargs)

    return base

def modal(name, icon, target, position = Position.TOP, **kwargs):
    return item(name, icon, position, **kwargs, is_modal = True, target = target)

def panel(name, icon, target, panel, **kwargs):
    return item(name, icon, Position.PANEL, **kwargs, target = target, panel = panel)

__all__ = [
    "Position",
    "item",
    "modal",
    "panel"
]

# Elements
navbar = [
    # Top
    modal("Logout", "fas fa-sign-out-alt", "#logout-modal"),

    # Sidebar
    item("Accueil", "fas fa-home", url = reverse("index")),
    item("Administration", "fas fa-cogs", url = reverse("admin:index")),

    # Panels
    panel("Messages", "fas fa-envelope", "#toasts-panel" , "navbar/panel/toasts.html", template = "navbar/items/toasts.html"),
]