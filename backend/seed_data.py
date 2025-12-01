from database import SessionLocal, engine, Base
from models import Admin, Venue

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Admin).count() > 0:
            print("Database already seeded!")
            return
        
        # Create admin user
        admin = Admin(
            email="admin@moviebooking.com",
            password="admin123"  # In production, hash this!
        )
        db.add(admin)
        
        # Create venues
        venues = [
            Venue(
                name="CineStar Downtown",
                location="MG Road, City Center",
                capacity=120,
                facilities="Dolby Atmos, Recliner seats, Snack counter"
            ),
            Venue(
                name="Galaxy Mall Cinema",
                location="Galaxy Mall, West Zone",
                capacity=180,
                facilities="3D Screen, Dolby Digital, Large Parking"
            ),
            Venue(
                name="RiverSide Multiplex",
                location="Riverside Road",
                capacity=90,
                facilities="AC Hall, Online Snacks Ordering, Wheelchair Access"
            )
        ]
        
        for venue in venues:
            db.add(venue)
        
        db.commit()
        print("✅ Database seeded successfully!")
        print("\n📌 Admin Credentials:")
        print("   Email: admin@moviebooking.com")
        print("   Password: admin123")
        print("\n🎭 Venues created:")
        for venue in venues:
            print(f"   - {venue.name} ({venue.capacity} seats)")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

