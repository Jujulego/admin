# Importations
from django.urls import reverse

# Enumérations
class Position:
    TOP = 0
    SIDEBAR = 1
    PANEL = 2

# Classe
def item(name, icon, ordre = 0, position = Position.SIDEBAR, **kwargs):
    base = {
        "name": name,
        "icon": icon,
        "ordre": ordre,
        "position": position,

        "is_modal": False,
        "is_shown": lambda req : True
    }

    base.update(kwargs)

    return base

def modal(name, icon, target, ordre = 0, position = Position.TOP, **kwargs):
    return item(name, icon, ordre, position, **kwargs, is_modal = True, target = target)

def panel(name, icon, target, panel, ordre = 0, **kwargs):
    return item(name, icon, ordre, Position.PANEL, **kwargs, target = target, panel = panel)

__all__ = [
    "Position",
    "item",
    "modal",
    "panel"
]

# Elements
navbar = [
    # Top
    modal("Logout", "fas fa-sign-out-alt", "#logout-modal", 100),

    # Sidebar
    item("Accueil", "fas fa-home", url = reverse("index")),
    item("Administration", "fas fa-cogs", 100, url = reverse("admin:index"), is_shown = lambda req : req.user.is_staff),

    # Panels
    panel("Messages", "fas fa-envelope", "#toasts-panel" , "navbar/panel/toasts.html", template = "navbar/items/toasts.html"),
]