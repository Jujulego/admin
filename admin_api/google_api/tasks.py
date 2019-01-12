# Importations
from .models import GoogleAPI

# Taches
def reset_quota():
    GoogleAPI.objects.update(quota=0)