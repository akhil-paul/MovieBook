from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta
from database import get_db
from models import Show, Movie, Venue
from schemas import ShowCreate, ShowResponse

router = APIRouter(tags=["shows"])

@router.get("/shows/{movie_id}", response_model=List[ShowResponse])
def get_shows_for_movie(movie_id: int, db: Session = Depends(get_db)):
    shows = db.query(Show).filter(Show.movie_id == movie_id).all()
    return shows

@router.post("/admin/shows", response_model=ShowResponse)
def create_show(show: ShowCreate, db: Session = Depends(get_db)):
    # Validate movie exists
    movie = db.query(Movie).filter(Movie.id == show.movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    # Validate venue exists
    venue = db.query(Venue).filter(Venue.id == show.venue_id).first()
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    
    # Calculate end time based on movie duration
    end_time = show.start_time + timedelta(minutes=movie.duration)
    
    # Create show with venue capacity as available seats
    db_show = Show(
        movie_id=show.movie_id,
        venue_id=show.venue_id,
        start_time=show.start_time,
        end_time=end_time,
        available_seats=venue.capacity
    )
    
    db.add(db_show)
    db.commit()
    db.refresh(db_show)
    return db_show

@router.get("/shows", response_model=List[ShowResponse])
def list_all_shows(db: Session = Depends(get_db)):
    shows = db.query(Show).all()
    return shows

