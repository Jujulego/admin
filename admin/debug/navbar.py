# Importations
from django.conf import settings
from navbar.navbar import panel

# Entrées
navbar = [
    # Panels
    panel("Debug", "fas fa-bug", "#debug-panel", "debug/panel.html", is_shown = lambda req: settings.DEBUG),
]