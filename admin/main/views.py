# Importations
from django.contrib import auth
from django.contrib.auth.decorators import login_required

from django.shortcuts import render, redirect
from django.views import View

# Vues
class LoginView(View):
    # Méthodes
    def get(self, req):
        # Si l'utilisateur est déjà connecté on le renvoie sur la page d'accueil
        if req.user.is_authenticated:
            return redirect(req.GET.get("next", "index"))

        return render(req, "main/login.html")

    def post(self, req):
        # Connexion
        user = auth.authenticate(req,
            username=req.POST["username"],
            password=req.POST["password"]
        )

        if user is not None:
            # Ok ! bienvenue !
            auth.login(req, user)
            return redirect(req.GET.get("next", "index"))

        else:
            # Echec ...
            return render(req, "main/login.html", {
                "erreur": True,
            })

@login_required
def index(req):
    return render(req, "main/base.html")

@login_required
def logout(req):
    auth.logout(req)
    return redirect("login")