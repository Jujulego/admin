# Importations
from django.urls import path

from . import consumers

# URLs
websocket_urlpatterns = [
    path(r'ws/chat/<room_name>/', consumers.AsyncChatConsumer, name = "ws_room"),
]