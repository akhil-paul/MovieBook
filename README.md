# 🎬 Movie Booking App

A complete full-stack movie booking application built with **FastAPI** (backend) and **React.js** (frontend).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Admin Credentials](#admin-credentials)

---

## ✨ Features

### 👨‍💼 Admin Features
- ✅ Admin login (email + password authentication)
- ✅ Add new movies with details (title, description, duration, poster)
- ✅ Schedule shows for movies:
  - Select venue and date/time
  - Auto-calculate end time based on movie duration
  - Track available seats
- ✅ View all bookings with customer details

### 👤 User Features
- ✅ Browse all available movies
- ✅ View detailed movie information with showtimes
- ✅ Check venue details and facilities
- ✅ Book seats for shows (First-Come First-Served)
- ✅ View booking confirmation
- ✅ Real-time seat availability updates

### 🎭 Pre-loaded Venues
1. **CineStar Downtown** - MG Road, City Center (120 seats)
2. **Galaxy Mall Cinema** - Galaxy Mall, West Zone (180 seats)
3. **RiverSide Multiplex** - Riverside Road (90 seats)

---

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **API Documentation**: Swagger/OpenAPI (auto-generated)

### Frontend
- **Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6

---

## 📁 Project Structure

```
movie-booking-app/
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   └── models.py           # SQLAlchemy models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── schemas.py          # Pydantic schemas
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── admin.py            # Admin routes
│   │   ├── movies.py           # Movie routes
│   │   ├── venues.py           # Venue routes
│   │   ├── shows.py            # Show routes
│   │   └── bookings.py         # Booking routes
│   ├── database.py             # Database configuration
│   ├── main.py                 # FastAPI app entry point
│   ├── seed_data.py            # Database seeding script
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js          # Axios API calls
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── MovieCard.jsx
    │   │   ├── VenueCard.jsx
    │   │   └── ShowCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── MovieDetails.jsx
    │   │   ├── BookShow.jsx
    │   │   ├── BookingSuccess.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AddMovie.jsx
    │   │   ├── AddShow.jsx
    │   │   └── ViewBookings.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Seed the database**:
   ```bash
   python seed_data.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload
```

Backend will run on: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

### Start Frontend Server

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## 📚 API Documentation

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | List all movies |
| GET | `/movies/{id}` | Get movie details |
| GET | `/venues` | List all venues |
| GET | `/shows/{movie_id}` | Get shows for a movie |
| GET | `/shows` | List all shows |
| POST | `/book/{show_id}` | Book seats for a show |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Admin login |
| POST | `/admin/movies` | Create new movie |
| POST | `/admin/shows` | Schedule new show |
| GET | `/bookings` | View all bookings |

### Example API Requests

#### Create Movie
```json
POST /admin/movies
{
  "title": "Inception",
  "description": "A thief who steals corporate secrets...",
  "duration": 148,
  "poster_url": "https://example.com/inception.jpg"
}
```

#### Create Show
```json
POST /admin/shows
{
  "movie_id": 1,
  "venue_id": 1,
  "start_time": "2025-12-01T18:30:00"
}
```

#### Book Show
```json
POST /book/1
{
  "user_name": "John Doe",
  "seats_booked": 3
}
```

---

## 🗄 Database Schema

### Models

**Admin**
- `id`: Integer (Primary Key)
- `email`: String (Unique)
- `password`: String

**Movie**
- `id`: Integer (Primary Key)
- `title`: String
- `description`: Text
- `duration`: Integer (minutes)
- `poster_url`: String

**Venue**
- `id`: Integer (Primary Key)
- `name`: String
- `location`: String
- `capacity`: Integer
- `facilities`: Text

**Show**
- `id`: Integer (Primary Key)
- `movie_id`: Foreign Key → Movie
- `venue_id`: Foreign Key → Venue
- `start_time`: DateTime
- `end_time`: DateTime
- `available_seats`: Integer

**Booking**
- `id`: Integer (Primary Key)
- `show_id`: Foreign Key → Show
- `user_name`: String
- `seats_booked`: Integer
- `timestamp`: DateTime

---

## 🖼 Screenshots

### User Flow

```
┌─────────────────────────────────────┐
│         HOME PAGE                   │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Movie1 │ │ Movie2 │ │ Movie3 │  │
│  │ Card   │ │ Card   │ │ Card   │  │
│  └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      MOVIE DETAILS PAGE             │
│  Movie Info + Available Showtimes   │
│  ┌──────────┐ ┌──────────┐         │
│  │ Show 1   │ │ Show 2   │         │
│  │ Book Now │ │ Book Now │         │
│  └──────────┘ └──────────┘         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       BOOKING PAGE                  │
│  Enter Name: _______________        │
│  Select Seats: [ 2 ]                │
│  [ Confirm Booking ]                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    BOOKING SUCCESS ✅                │
│  Booking ID: #123                   │
│  Movie: Inception                   │
│  Seats: 2                           │
└─────────────────────────────────────┘
```

### Admin Flow

```
┌─────────────────────────────────────┐
│       ADMIN LOGIN                   │
│  Email: _______________             │
│  Password: ___________              │
│  [ Sign In ]                        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     ADMIN DASHBOARD                 │
│  Stats: Movies | Venues | Shows     │
│  Quick Actions:                     │
│  - Add Movie                        │
│  - Add Show                         │
│  - View Bookings                    │
└─────────────────────────────────────┘
```

---

## 🔑 Admin Credentials

After running `seed_data.py`, use these credentials to login:

- **Email**: `admin@moviebooking.com`
- **Password**: `admin123`

---

## 🎯 Key Features Implementation

### FCFS Booking Rule
The system implements First-Come First-Served booking:
- Each show starts with `available_seats = venue.capacity`
- When a booking is made, seats are deducted immediately
- No overbooking allowed - validated on backend
- Real-time seat availability displayed

### Auto-calculated Show End Time
- When creating a show, only start time is required
- End time is automatically calculated: `start_time + movie.duration`
- Prevents scheduling conflicts

### Input Validation
- Pydantic schemas validate all API inputs
- Frontend validates form inputs
- No negative seats or invalid dates
- Email format validation for admin login

---

## 🔧 Development Notes

### Backend
- SQLite database file: `movie_booking.db` (auto-created)
- CORS enabled for frontend communication
- Auto-generated API docs at `/docs`

### Frontend
- Tailwind CSS for modern, responsive design
- React Router for client-side routing
- Axios interceptors ready for JWT (future enhancement)
- LocalStorage for admin session management

---

## 🚀 Future Enhancements

- [ ] JWT-based authentication
- [ ] Password hashing (bcrypt)
- [ ] Seat map selection (visual seat picker)
- [ ] Payment integration
- [ ] Email confirmation
- [ ] QR code tickets
- [ ] Movie ratings and reviews
- [ ] Search and filter functionality
- [ ] PostgreSQL for production
- [ ] Docker containerization

---

## 📝 License

This project is created for educational purposes.

---

## 👨‍💻 Developer

Built with ❤️ using FastAPI and React.js

**Happy Booking! 🎬🍿**

