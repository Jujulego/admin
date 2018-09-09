# Importations
from django.urls import path

from . import views

# Urls
app_name = "chat"
urlpatterns = [
    # Accueil
    path('', views.index, name="index"),
    path('<room_name>/', views.room, name='room'),
]
