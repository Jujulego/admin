# Importations
from django.contrib.auth import authenticate, login

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
@permission_classes((AllowAny,))
def is_authenticated(request):
    return Response(request.user.is_authenticated)

@api_view(['POST'])
@permission_classes((AllowAny,))
def api_login(request):
    # Try to authenticate user
    user = authenticate(
        username=request.data["username"],
        password=request.data["password"]
    )

    if user is not None:
        login(request, user)

    return Response(user is not None)