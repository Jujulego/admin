# Importations
from django.conf import settings

from navbar import Panel
from navbar.navbars import navbar

# Entrées
@navbar.register
class DebugPanel(Panel):
    # Attributs
    name = "Debug"
    icon = "fas fa-bug"
    target = "#debug-panel"

    panel = "debug/panel.html"

    # Méthodes
    def is_shown(self, req):
        return settings.DEBUG