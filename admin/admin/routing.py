# Importations
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import chat.routing
import terminal.routing

# Router
application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([]
            #+ chat.routing.websocket_urlpatterns
            #+ terminal.routing.websocket_urlpatterns
        )
    ),
})