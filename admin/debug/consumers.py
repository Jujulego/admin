# Importations
from channels.generic.websocket import WebsocketConsumer

# Consumer
class DebugConsumer(WebsocketConsumer):
    # Méthodes
    def connect(self):
        self.accept()