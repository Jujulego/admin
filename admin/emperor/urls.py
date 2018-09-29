# Importations
from django.contrib.auth.decorators import login_required
from django.urls import path

from . import views

# Urls
app_name = "emperor"
urlpatterns = [
    # Accueil
    path('',                  login_required(views.IndexView.as_view()),  name="index"),
    path('creer',             login_required(views.VassalView.as_view()), name="creer"),
    path('edit/<int:vassal>', login_required(views.VassalView.as_view()), name="edit"),
]
