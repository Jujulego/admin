# Importations
from .item import Item
from .menu import Menu
from .modal import Modal
from .panel import Panel

# Fonctions générant un item
def item(name, icon, url, *,
         ordre = Item.ordre,
         position = Item.position,
         template = Item.template,
         is_modal = Item.is_modal,
         target = Item.target,
         base = Item, **kwargs):

    # Construction d'une classe
    class C(base):
        pass

    # Ajout des attributs
    setattr(C, "name", name)
    setattr(C, "icon", icon)
    setattr(C, "url", url)
    setattr(C, "ordre", ordre)
    setattr(C, "position", position)
    setattr(C, "template", template)
    setattr(C, "is_modal", is_modal)
    setattr(C, "target", target)

    for n, v in kwargs.items():
        setattr(C, n, v)

    return C

def menu(name, icon, menu, items, *,
         ordre = Menu.ordre,
         position = Menu.position,
         template = Menu.template,
         base = Menu, **kwargs):

    return item(name, icon, None,
        ordre = ordre,
        position = position,
        template = template,
        base = base,
        menu = menu,
        items = items,
        **kwargs
    )

def modal(name, icon, target, *,
          ordre = Modal.ordre,
          position = Modal.position,
          template = Modal.template,
          base = Modal, **kwargs):

    return item(name, icon, None,
        ordre = ordre,
        position = position,
        template = template,
        target = target,
        base = base,
        **kwargs
    )

def panel(name, icon, target, panel, *,
          ordre = Panel.ordre,
          position = Panel.position,
          template = Panel.template,
          base = Panel, **kwargs):

    return item(name, icon, None,
        ordre = ordre,
        position = position,
        template = template,
        target = target,
        base = base,
        panel = panel,
        **kwargs
    )