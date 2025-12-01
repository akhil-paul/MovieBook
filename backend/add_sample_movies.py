from database import SessionLocal
from models import Movie

def add_sample_movies():
    db = SessionLocal()
    
    try:
        # Check if movies already exist
        existing_count = db.query(Movie).count()
        if existing_count > 0:
            print(f"⚠️  {existing_count} movie(s) already exist in the database.")
            response = input("Do you want to add more movies anyway? (y/n): ")
            if response.lower() != 'y':
                print("❌ Cancelled. No movies were added.")
                return
        
        # Sample movies data
        sample_movies = [
            {
                "title": "Inception",
                "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "duration": 148,
                "poster_url": "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
            },
            {
                "title": "The Dark Knight",
                "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "duration": 152,
                "poster_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
            },
            {
                "title": "Interstellar",
                "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                "duration": 169,
                "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            },
            {
                "title": "The Shawshank Redemption",
                "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "duration": 142,
                "poster_url": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
            },
            {
                "title": "Pulp Fiction",
                "description": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
                "duration": 154,
                "poster_url": "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"
            },
            {
                "title": "The Matrix",
                "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                "duration": 136,
                "poster_url": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
            },
            {
                "title": "Forrest Gump",
                "description": "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
                "duration": 142,
                "poster_url": "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
            },
            {
                "title": "Avatar",
                "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
                "duration": 162,
                "poster_url": "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
            },
            {
                "title": "Avengers: Endgame",
                "description": "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos' actions.",
                "duration": 181,
                "poster_url": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
            },
            {
                "title": "Parasite",
                "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
                "duration": 132,
                "poster_url": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
            },
            {
                "title": "Joker",
                "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
                "duration": 122,
                "poster_url": "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
            },
            {
                "title": "Spider-Man: No Way Home",
                "description": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
                "duration": 148,
                "poster_url": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
            }
        ]
        
        # Add movies to database
        added_count = 0
        for movie_data in sample_movies:
            # Check if movie with same title already exists
            existing = db.query(Movie).filter(Movie.title == movie_data["title"]).first()
            if existing:
                print(f"⏭️  Skipped: '{movie_data['title']}' (already exists)")
                continue
            
            movie = Movie(**movie_data)
            db.add(movie)
            added_count += 1
            print(f"✅ Added: '{movie_data['title']}' ({movie_data['duration']} mins)")
        
        db.commit()
        
        print(f"\n🎬 Successfully added {added_count} new movie(s)!")
        print(f"📊 Total movies in database: {db.query(Movie).count()}")
        print("\n🌐 You can now view them at: http://localhost:3000")
        
    except Exception as e:
        print(f"❌ Error adding movies: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🎬 Adding Sample Movies to Database...\n")
    add_sample_movies()

