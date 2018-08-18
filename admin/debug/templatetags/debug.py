# Importations
from django import template

from copy import copy

# Librairie
register = template.Library()

# Balises
@register.simple_tag(name="context", takes_context=True)
def ctx(context):
    return copy(context)