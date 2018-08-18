# Importations
from django import template

# Librairie
register = template.Library()

# Filtres
@register.filter
def extract(value, cle):
    return (v[cle] for v in value)

@register.filter
def mod(value, div):
    return value % div

@register.filter(name="sum")
def somme(value):
    r = 0

    for v in value:
        r += float(v)

    return r