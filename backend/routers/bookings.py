from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Booking, Show
from schemas import BookingCreate, BookingResponse

router = APIRouter(tags=["bookings"])

@router.post("/book/{show_id}", response_model=BookingResponse)
def book_show(show_id: int, booking: BookingCreate, db: Session = Depends(get_db)):
    # Get the show
    show = db.query(Show).filter(Show.id == show_id).first()
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    
    # Check if enough seats are available (FCFS rule)
    if show.available_seats < booking.seats_booked:
        raise HTTPException(
            status_code=400, 
            detail=f"Not enough seats available. Only {show.available_seats} seats left."
        )
    
    # Create booking
    db_booking = Booking(
        show_id=show_id,
        user_name=booking.user_name,
        seats_booked=booking.seats_booked
    )
    
    # Update available seats
    show.available_seats -= booking.seats_booked
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    return db_booking

@router.get("/bookings", response_model=List[BookingResponse])
def list_bookings(db: Session = Depends(get_db)):
    bookings = db.query(Booking).all()
    return bookings

