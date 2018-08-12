# Importations
from django.shortcuts import render

# Vues
def index(req):
    return render(req, "main/base.html")
