# Importations
from .navbars import navbar as _navbar

# Context processors
def navbar(request):
    _navbar.request = request
    return { "navbar": _navbar }