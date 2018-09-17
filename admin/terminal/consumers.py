# Importations
from django.utils.html import escape
from channels.generic.websocket import WebsocketConsumer

from shlex import split
import platform, subprocess, traceback

# Constants
ENCODING = "cp850" if platform.system() == "Windows" else "utf-8"

# Consumer
class TerminalConsumer(WebsocketConsumer):
    # Méthodes
    def connect(self):
        self.accept()
        self.send("Bienvenue !\n")

    def receive(self, text_data = None, bytes_data=None):
        try:
            res = subprocess.run(split(text_data), stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            self.send(escape(res.stdout.decode(ENCODING)))

        except Exception as err:
            self.send(escape(traceback.format_exception_only(err.__class__, err)[0]))
