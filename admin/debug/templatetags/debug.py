# Importations
from django import template
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Model, QuerySet
from django.utils.functional import *

from copy import copy

# Librairie
register = template.Library()
encoder = DjangoJSONEncoder()

# Tags
@register.simple_tag(name="context", takes_context=True)
def ctx(context):
    return copy(context)

# Filtres
@register.filter(name="json")
@keep_lazy(str)
def _(data):
    # Objets wrappés
    if isinstance(data, Promise):
        data = data._proxy____cast()

    if isinstance(data, LazyObject):
        if data._wrapped is empty:
            data._setup()

        data = data._wrapped

    # Sérialisation
    try:
        if isinstance(data, QuerySet):
            return serializers.serialize("json", data)

        elif isinstance(data, Model):
            return serializers.serialize("json", (data,))[1:-1]

        return encoder.encode(data)

    except TypeError as err:
        return encoder.encode(repr(data))