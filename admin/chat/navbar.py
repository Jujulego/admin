# Importations
from django.urls import reverse

from navbar.navbar import *

# Items
navbar = [
    item("Chat", "fas fa-comments", url = reverse("chat:index"))
]