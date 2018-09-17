# Importations
from django.urls import path

from . import consumers

# URLs
websocket_urlpatterns = [
    path('ws/terminal', consumers.TerminalConsumer, name="terminal"),
]