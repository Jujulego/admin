# Importations
from django.http import JsonResponse, QueryDict
from django.shortcuts import render, get_object_or_404
from django.views import View

from .models import Dossier, Fichier

# Create your views here.
def index(req):
    return render(req, "fichiers/index.html")

class ApiView(View):
    # Méthodes
    def options(self, req, *args, **kwargs): # => métadonnées
        if "dossier" in req.GET:
            return JsonResponse(get_object_or_404(Dossier, id=req.GET["dossier"]).get_metadata())

        if "fichier" in req.GET:
            return JsonResponse(get_object_or_404(Fichier, id=req.GET["fichier"]).get_metadata())

        return JsonResponse({})

    def get(self, req): # => contenu
        # Arguments
        parent = req.GET.get("parent", None)

        if parent is not None:
            parent = get_object_or_404(Dossier, id=parent)

        # Réponse
        return JsonResponse({
            "dossiers": [{"id": d.id, "nom": d.nom} for d in Dossier.objects.filter(parent=parent).only("id", "nom")],
            "fichiers": [{"id": f.id, "nom": f.nom} for f in Fichier.objects.filter(dossier=parent).only("id", "nom")]
        })

    def put(self, req): # => ajout
        # Récupérattion des paramètres
        params = QueryDict(req.body)
        parent = params.get("parent", None)

        if parent is not None:
            parent = get_object_or_404(Dossier, id=parent)

        # Création du dossier
        d = Dossier(parent=parent, nom=params["nom"], proprietaire=req.user)
        d.save()

        return JsonResponse(d.get_metadata())