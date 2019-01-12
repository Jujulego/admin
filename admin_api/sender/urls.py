# Importations
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# URLs
urlpatterns = format_suffix_patterns([
    # Contacts
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.ContactDetail.as_view()),

    # Listes
    path('listeenvois/', views.ListeEnvoiList.as_view()),
    path('listeenvois/<int:pk>/', views.ListeEnvoiDetail.as_view()),
])
