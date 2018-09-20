# Importations
from django.urls import path

from . import consumers

# URLs
websocket_urlpatterns = [
    path('ws/chat/<room_name>/', consumers.AsyncChatConsumer),
]