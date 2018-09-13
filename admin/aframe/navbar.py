# Importations
from django.urls import reverse

from navbar import Item
from navbar.navbars import navbar

# Entrées
@navbar.register
class ChatItem(Item):
    # Attributs
    name = "AFrame"
    icon = "fas fa-cubes"
    url = reverse("aframe:index")