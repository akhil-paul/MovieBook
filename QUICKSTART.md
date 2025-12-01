# 🚀 Quick Start Guide

Get the Movie Booking App running in 5 minutes!

## Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed the database
python seed_data.py
```

## Step 2: Setup Frontend

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install
```

## Step 3: Run the Application

### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload
```

✅ Backend running at: http://localhost:8000
📚 API Docs: http://localhost:8000/docs

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000

## Step 4: Login as Admin

Open http://localhost:3000 in your browser

Click "Admin Login" and use:
- **Email**: admin@moviebooking.com
- **Password**: admin123

## What to Do Next?

1. **Add a Movie**: Click "Add Movie" in admin dashboard
2. **Schedule a Show**: Click "Add Show" to create showtimes
3. **Test Booking**: Go to home page, select a movie, and book seats
4. **View Bookings**: Check all bookings in admin panel

## Sample Movie Data

You can add this sample movie to test:

- **Title**: Inception
- **Description**: A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.
- **Duration**: 148 (minutes)
- **Poster URL**: https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg

## Troubleshooting

### Backend won't start?
- Make sure you activated the virtual environment
- Check if port 8000 is available

### Frontend won't start?
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

### Database errors?
- Delete `movie_booking.db` and run `python seed_data.py` again

## Need Help?

Check the main [README.md](README.md) for detailed documentation.

Happy Booking! 🎬

