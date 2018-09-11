# Importations
from functools import update_wrapper

__all__ = [
    "if_staff", "if_auth"
]

# Décorateurs
def wrap(cls):
    def deco(f):
        update_wrapper(f, cls.is_shown)

        setattr(f, "__module__", cls.__module__)
        setattr(f, "__qualname__", cls.__qualname__ + ".is_shown")

        return f

    return deco

def if_auth(cls):
    # New is_shown method
    @wrap(cls)
    def is_shown(self, req):
        return req.user.is_authenticated()

    # Change 'is_shown' method
    setattr(cls, "is_shown", is_shown)

    return cls

def if_staff(cls):
    # New is_shown method
    @wrap(cls)
    def is_shown(self, req):
        return req.user.is_staff

    # Change 'is_shown' method
    setattr(cls, "is_shown", is_shown)

    return cls