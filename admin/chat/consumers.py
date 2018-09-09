# Importations
from asgiref.sync import async_to_sync
import json

from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer

# Consumer
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # Join room
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = "chat_{}".format(self.room_name)

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        # Accept connexion
        self.accept()

    def disconnect(self, close_code):
        # Leave room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        # Send message to room
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def chat_message(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message
        }))

class AsyncChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Join room
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = "chat_{}".format(self.room_name)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept connexion
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Send message to room
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
