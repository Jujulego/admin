# Importations
from django.urls import path

from . import views

# Urls
app_name = "fichiers"
urlpatterns = [
    # Accueil
    path('', views.index, name="index"),

    # Objets
    path('api', views.ApiView.as_view(), name="api"),
]
