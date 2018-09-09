# Importations
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

# Create your views here.
def index(req):
    return render(req, "chat/index.html", {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })