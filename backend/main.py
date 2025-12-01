from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import admin_router, movies_router, venues_router, shows_router, bookings_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Booking API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(admin_router)
app.include_router(movies_router)
app.include_router(venues_router)
app.include_router(shows_router)
app.include_router(bookings_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Movie Booking API",
        "docs": "/docs",
        "version": "1.0.0"
    }

