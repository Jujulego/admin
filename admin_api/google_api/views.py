# Importations
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .oauth import OAuth

# Create your views here.
@api_view(['GET'])
def step1(request):
    url = OAuth.get_authorization_url(request.GET.get("email"), "")

    return Response({
        'url': url,
    })

@api_view(['GET'])
def step2(request):
    OAuth.get_credentials(request.GET.get("code"), "")
    return redirect("angular")