# Importations
from django.urls import reverse
from .items import Item, Modal, Panel
from .decorators import if_staff
from .navbars import navbar

# Classes
@navbar.register
class HomeItem(Item):
    # Attributs
    name = "Accueil"
    icon = "fas fa-home"
    url = reverse("index")

@navbar.register
@if_staff
class AdminItem(Item):
    # Attributs
    name = "Administration"
    icon = "fas fa-cogs"
    url = reverse("admin:index")

    ordre = 100

@navbar.register
class LogoutModal(Modal):
    # Attributs
    name = "Logout"
    icon = "fas fa-sign-out-alt"
    target = "#logout-modal"

    ordre = 100

@navbar.register
class ToastsPanel(Panel):
    # Attributs
    name = "Messages"
    icon = "fas fa-envelope"
    target = "#toasts-panel"

    panel = "navbar/panel/toasts.html"
    template = "navbar/items/toasts.html"

    css = [
        "navbar/css/toasts.css",
    ]
    js = [
        "navbar/js/toasts.js",
    ]