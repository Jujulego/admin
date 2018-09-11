# Importations
from enum import Flag, auto

# Enumération
class Position(Flag):
    TOP     = auto()
    SIDEBAR = auto()
    PANEL   = auto()

# Classe
class Item:
    # Attributs
    name = None
    icon = None
    url = None

    ordre = 0
    position = Position.SIDEBAR
    template = None

    is_modal = False
    target = None

    # Méthodes spéciales
    def __init__(self):
        # Checks
        assert self.name is not None, "navbar.Item need a 'name' attribute"
        assert self.icon is not None, "navbar.Item need a 'icon' attribute"

        if self.is_modal:
            assert self.target is not None, "navbar.Item need a 'target' attribute"

    def __repr__(self):
        return "<{}: {}>".format(self.__class__.__qualname__, self.name)

    # - comparaisons
    def __gt__(self, other):
        if isinstance(other, Item):
            return self.ordre > other.ordre

        return NotImplemented

    def __lt__(self, other):
        if isinstance(other, Item):
            return self.ordre < other.ordre

        return NotImplemented

    # Méthodes
    def is_shown(self, req):
        return True