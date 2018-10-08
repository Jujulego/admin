# Importations
from django.apps import AppConfig

# Configs
class FichiersConfig(AppConfig):
    # Attributs
    name = 'fichiers'

    # Méthodes
    def ready(self):
        from . import signals