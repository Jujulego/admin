# Importations
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Contact, ListeEnvoi
from .serializers import ContactSerializer, ListeEnvoiSerializer

# Constantes
SCOPES = 'https://www.googleapis.com/auth_api/gmail.send'

# Vues
# - contacts
class ContactList(generics.ListCreateAPIView):
    # Options
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    permission_classes = (IsAuthenticated,)

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    # Options
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# - listes d'envoi
class ListeEnvoiList(generics.ListCreateAPIView):
    # Options
    queryset = ListeEnvoi.objects.all()
    serializer_class = ListeEnvoiSerializer

class ListeEnvoiDetail(generics.RetrieveUpdateDestroyAPIView):
    # Options
    queryset = ListeEnvoi.objects.all()
    serializer_class = ListeEnvoiSerializer
