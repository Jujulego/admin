# Importations
import base64
import pickle

from django.db import models
from django.utils import encoding

from oauth2client.client import Credentials

# Classes
class CredentialsField(models.Field):
    """Permet de stocker un objet Credentials (oauth2client.contrib.django_util.models.CredentialsField)"""

    # Méthodes spéciales
    def __init__(self, *args, **kwargs):
        if 'null' not in kwargs:
            kwargs['null'] = True

        super(CredentialsField, self).__init__(*args, **kwargs)

    # Méthodes
    def get_internal_type(self):
        return "BinaryField"

    def from_db_value(self, value, expression, connection, context):
        return self.to_python(value)

    def to_python(self, value):
        if value is None:
            return None
        elif isinstance(value, Credentials):
            return value
        else:
            return pickle.loads(base64.b64decode(encoding.smart_bytes(value)))

    def get_prep_value(self, value):
        if value is None:
            return None
        else:
            return encoding.smart_text(base64.b64encode(pickle.dumps(value)))

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)