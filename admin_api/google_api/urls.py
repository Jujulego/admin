# Importations
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# URLs
urlpatterns = format_suffix_patterns([
    # Contacts
    path('oauth/step1/', views.step1),
    path('oauth/step2/', views.step2),
])
