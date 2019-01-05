# Importations
from rest_framework import generics

from .models import Contact, ListeEnvoi
from .serializers import ContactSerializer, ListeEnvoiSerializer

# Vues
# - contacts
class ContactList(generics.ListCreateAPIView):
    # Options
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    # Options
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

# - contacts
class ListeEnvoiList(generics.ListCreateAPIView):
    # Options
    queryset = ListeEnvoi.objects.all()
    serializer_class = ListeEnvoiSerializer

class ListeEnvoiDetail(generics.RetrieveUpdateDestroyAPIView):
    # Options
    queryset = ListeEnvoi.objects.all()
    serializer_class = ListeEnvoiSerializer
