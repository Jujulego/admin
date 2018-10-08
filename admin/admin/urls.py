# Importations
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

# Urls
urlpatterns = [
    path('', include("navbar.urls")),
    path('admin/', admin.site.urls),
    #path('aframe/', include("aframe.urls", namespace="aframe")),
    #path('chat/', include("chat.urls", namespace="chat")),
    path('emperor/', include("emperor.urls", namespace="emperor")),
    path('fichiers/', include("fichiers.urls", namespace="fichiers")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
