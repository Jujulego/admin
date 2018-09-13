# Importations
from django.urls import path

from . import views

# Urls
app_name = "aframe"
urlpatterns = [
    # Accueil
    path('', views.index, name="index"),
]
