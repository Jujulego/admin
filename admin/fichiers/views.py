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

    def delete(self, req): # => delete
        # Récupérattion des paramètres
        params = QueryDict(req.body)

        res1 = Dossier.objects.filter(id__in = params.getlist("dossiers[]")).delete()
        res2 = Fichier.objects.filter(id__in = params.getlist("fichiers[]")).delete()

        return JsonResponse({
            "total": res1[0] + res2[0],
            "dossiers": res1[1].get("fichiers.Dossier", 0),
            "fichiers": res1[1].get("fichiers.Fichier", 0) + res2[1].get("fichiers.Fichier", 0),
        })