# Importations
from django.urls import reverse

from navbar import Item
from navbar.navbars import navbar

# Entrées
@navbar.register
class FichiersItem(Item):
    # Attributs
    name = "Stockage"
    icon = "fas fa-hdd"
    url = reverse("fichiers:index")