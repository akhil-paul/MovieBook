from .admin import router as admin_router
from .movies import router as movies_router
from .venues import router as venues_router
from .shows import router as shows_router
from .bookings import router as bookings_router

__all__ = ["admin_router", "movies_router", "venues_router", "shows_router", "bookings_router"]

