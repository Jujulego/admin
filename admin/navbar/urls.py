# Importations
from django.urls import path

from . import views

# Urls
urlpatterns = [
    # Accueil
    path('', views.index, name="index"),

    # Connexion
    path("login", views.LoginView.as_view(), name="login"),
    path("logout", views.logout, name="logout"),
]
