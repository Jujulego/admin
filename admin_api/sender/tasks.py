# Importations
from .models import SendQueue

# Taches
def sender():
    # Y a t'il des messages ?
    if SendQueue.objects.count() == 0: return

    # Envoi du plus vieux !
    queryset = SendQueue.objects.order_by("date")

    for sq in queryset:
        sq.send()