# Importations
from django.urls import reverse

from navbar import Item, Position
from navbar.navbars import navbar

# Entrées
@navbar.register
class ChatItem(Item):
    # Attributs
    name = "Chat"
    icon = "fas fa-comments"
    url = reverse("chat:index")
    position = Position.TOP