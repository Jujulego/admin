# Importations
from django.conf import settings

from navbar import Panel
from navbar.navbars import navbar

# Entrées
@navbar.register
class TerminalPanel(Panel):
    # Attributs
    name = "Terminal"
    icon = "fas fa-terminal"
    target = "#terminal-panel"

    panel = "terminal/terminal.html"

    css = [
        'terminal/css/terminal.css'
    ]
    js = [
        'terminal/js/terminal.js'
    ]

    # Méthodes
    def is_shown(self, req):
        return settings.DEBUG