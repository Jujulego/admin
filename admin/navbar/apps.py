# Importations
from django.apps import AppConfig
from django.apps.registry import apps

from importlib import import_module

# Configuration
class NavbarConfig(AppConfig):
    # Attributs
    name = 'navbar'

    # Méthodes
    def ready(self):
        super(NavbarConfig, self).ready()

        # Chargement de modules !
        for conf in apps.get_app_configs():
            try:
                import_module(conf.name + ".navbar").navbar

            except ImportError:
                pass