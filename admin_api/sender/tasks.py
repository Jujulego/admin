# Importations
from .models import SendQueue

# Taches
def sender():
    # Y a t'il des messages ?
    if SendQueue.objects.count() == 0: return

    # Envoi du plus vieux !
    sq = SendQueue.objects.order_by("-date").first()
    sq.message.send()
    sq.delete()