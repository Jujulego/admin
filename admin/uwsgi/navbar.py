# Importations
from django.urls import reverse

from navbar import Item
from navbar.decorators import if_staff
from navbar.navbars import navbar

# Entrées
@navbar.register
@if_staff
class UwsgiItem(Item):
    # Attributs
    name = "Uwsgi"
    icon = "fas fa-server"
    url = reverse("uwsgi:index")