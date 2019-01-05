# Importations
from rest_framework import serializers
from .models import Contact, ListeEnvoi

# Serializers
class ContactSerializer(serializers.ModelSerializer):
    # Meta
    class Meta:
        model = Contact
        fields = ('id', 'nom', 'email')

class ListeEnvoiSerializer(serializers.ModelSerializer):
    # Meta
    class Meta:
        model = ListeEnvoi
        fields = ('id', 'nom', 'contacts')
