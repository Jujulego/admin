# Importations
from .item import Item, Position

# Classe
class Panel(Item):
    # Attributs
    panel = None
    position = Position.PANEL

    # Méthodes spéciales
    def __init__(self):
        super(Panel, self).__init__()

        # Check bonus !
        assert self.target is not None, "navbar.Panel need a 'target' attribute"