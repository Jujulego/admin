# Importations
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

# URLs
urlpatterns = format_suffix_patterns([
    # Vues API
    path('login/',  views.api_login),
    path('logout/', views.api_logout),
    path('authenticated/', views.is_authenticated),
])
