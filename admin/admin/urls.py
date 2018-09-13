# Importations
from django.contrib import admin
from django.urls import include, path

# Urls
urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include("navbar.urls")),
    path('aframe/', include("aframe.urls", namespace="aframe")),
    path('chat/', include("chat.urls", namespace="chat")),
]
