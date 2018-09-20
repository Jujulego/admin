# Importations
from django.urls import path

from . import views

# Urls
app_name = "uwsgi"
urlpatterns = [
    # Accueil
    path('', views.index, name="index"),
    path('creer', views.VassalView.as_view(), name="creer"),
    path('edit/<int:vassal>', views.VassalView.as_view(), name="edit"),
]
