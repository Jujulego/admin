# Importations
from django.contrib import messages
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views import View

from .models import Vassal

# Create your views here.
class IndexView(View):
    # Méthodes
    def get(self, req):
        return render(req, "emperor/index.html", {
            "vassals": Vassal.objects.all(),
        })

    def post(self, req):
        # Lancement de rechargement
        v = get_object_or_404(Vassal, id=req.POST.get("vassal"))
        v.save()

        # Message et réponse
        messages.info(req, "Rechargement de " + v.nom)
        return JsonResponse({})

class VassalView(View):
    # Méthodes
    def get(self, req, vassal=None):
        if vassal is not None:
            return render(req, "emperor/edit.html", {
                "vassal": get_object_or_404(Vassal, id=vassal),
            })

        else:
            return render(req, "emperor/edit.html")

    def post(self, req, vassal=None):
        # Récupération / Création de l'objet
        if vassal is not None:
            v = get_object_or_404(Vassal, id=vassal)
        else:
            v = Vassal()

        # Remplissage
        v.nom = req.POST["nom"]
        v.actif = req.POST.get("actif", "off") == "on"
        v.format = req.POST["language"]
        v.config = req.POST["config"]

        v.save()

        if vassal is not None:
            messages.success(req, "Vassal modifié !")
            return JsonResponse({})

        else:
            messages.success(req, "Vassal créé !")
            return JsonResponse({
                "redirect": reverse("emperor:edit", kwargs={
                    "vassal": v.id,
                })
            })

    def delete(self, req, vassal=None):
        # Gardien
        if vassal is None:
            raise Http404

        # Destruction
        v = get_object_or_404(Vassal, id=vassal)
        v.delete()

        messages.success(req, "Vassal supprimé !")
        return JsonResponse({
            "redirect": reverse("emperor:index")
        })