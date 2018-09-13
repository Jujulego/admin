# Importations
from .item import Item

# Classe
class Menu(Item):
    # Attributs
    menu = None
    items = []

    template = "navbar/items/menu.html"

    # Méthodes spéciales
    def __init__(self):
        super(Menu, self).__init__()

        # Check supplémentaires
        assert self.menu is not None, "navbar.Menu need a 'menu' attribute"
        assert all(issubclass(it, Item) for it in self.items), "All items should inherit from navbar.Item"