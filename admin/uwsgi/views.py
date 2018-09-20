# Importations
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views import View

from .models import Vassal

# Create your views here.
def index(request):
    return render(request, "uwsgi/index.html", {
        "vassals": Vassal.objects.all(),
    })

class VassalView(View):
    # Méthodes
    def get(self, req, vassal=None):
        if vassal is not None:
            return render(req, "uwsgi/edit.html", {
                "vassal": get_object_or_404(Vassal, id=vassal),
            })

        else:
            return render(req, "uwsgi/edit.html")

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
            return JsonResponse({})
        else:
            return JsonResponse({
                "redirect": reverse("uwsgi:edit", kwargs={
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

        return JsonResponse({
            "redirect": reverse("uwsgi:index")
        })