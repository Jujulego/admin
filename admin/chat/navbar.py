# Importations
from django.urls import reverse

from navbar.navbar import *

# Items
navbar = [
    item("Chat", "fas fa-comments", 0, Position.TOP, url = reverse("chat:index"))
]