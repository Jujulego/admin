"""admin_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView

urlpatterns = [
    # Administration
    path('admin/', admin.site.urls),

    # API
    path('api/auth/',   include('auth_api.urls')),
    path('api/google/', include('google_api.urls')),
    path('api/sender/', include('sender.urls')),

    # Application Angular !
    re_path(r'.*', ensure_csrf_cookie(TemplateView.as_view(template_name="index.html")), name="angular")
]
