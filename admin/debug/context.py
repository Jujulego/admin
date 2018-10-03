# Importations
try:
    import uwsgi as _uwsgi

except ImportError:
    _uwsgi = True

# Context processors
def uwsgi(request):
    return { "uwsgi": _uwsgi }