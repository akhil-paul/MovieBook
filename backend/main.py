import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from routers import admin_router, movies_router, venues_router, shows_router, bookings_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Movie Booking API", version="1.0.0")

# CORS middleware - Allow both local development and production URLs
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default port
    "https://moviebook-frontend-50s0.onrender.com",  # Production frontend URL
]

# In development, allow all origins
if os.getenv("ENVIRONMENT") == "development":
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy"}

# Auto-seed database on startup (for first deployment)
@app.on_event("startup")
async def startup_event():
    """Initialize database with seed data if empty"""
    try:
        from models.models import Admin
        from seed_data import seed_database
        
        db = SessionLocal()
        admin_exists = db.query(Admin).first()
        db.close()
        
        if not admin_exists:
            print("🌱 Database is empty. Seeding initial data...")
            seed_database()
        else:
            print("✅ Database already contains data. Skipping seed.")
    except Exception as e:
        print(f"⚠️ Startup seeding check failed: {e}")

