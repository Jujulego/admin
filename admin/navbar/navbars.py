# Importations
from .items import Position

# Classe
class Navbar:
    # Méthodes spéciales
    def __init__(self):
        # Initialisation
        self._items = []
        self._top_links = []
        self._sidebar = []
        self._panels = []

        self.request = None

    # Décorateur
    def register(self, *classes):
        for cls in classes:
            item = cls()
            self._items.append(item)

            if item.position & Position.TOP:
                self._top_links.append(item)
                self._top_links.sort()

            if item.position & Position.SIDEBAR:
                self._sidebar.append(item)
                self._sidebar.sort()

            if item.position & Position.PANEL:
                self._panels.append(item)
                self._panels.sort()

        # Utilisation sous forme décorateur
        return classes[0]

    # Propriétés
    @property
    def top_links(self):
        return [it for it in self._top_links if self.request is None or it.is_shown(self.request)]

    @property
    def sidebar(self):
        return [it for it in self._sidebar if self.request is None or it.is_shown(self.request)]

    @property
    def panels(self):
        return [it for it in self._panels if self.request is None or it.is_shown(self.request)]

    @property
    def css(self):
        return [f for it in self._items for f in it.css]

    @property
    def js(self):
        return [f for it in self._items for f in it.js]

# Default navbar
navbar = Navbar()