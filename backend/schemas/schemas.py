from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# Admin Schemas
class AdminLogin(BaseModel):
    email: str
    password: str

# Movie Schemas
class MovieCreate(BaseModel):
    title: str
    description: str
    duration: int = Field(..., gt=0, description="Duration in minutes")
    poster_url: str

class MovieResponse(BaseModel):
    id: int
    title: str
    description: str
    duration: int
    poster_url: str
    
    class Config:
        from_attributes = True

# Venue Schemas
class VenueResponse(BaseModel):
    id: int
    name: str
    location: str
    capacity: int
    facilities: str
    
    class Config:
        from_attributes = True

# Show Schemas
class ShowCreate(BaseModel):
    movie_id: int
    venue_id: int
    start_time: datetime

class ShowResponse(BaseModel):
    id: int
    movie_id: int
    venue_id: int
    start_time: datetime
    end_time: datetime
    available_seats: int
    movie: Optional[MovieResponse] = None
    venue: Optional[VenueResponse] = None
    
    class Config:
        from_attributes = True

# Booking Schemas
class BookingCreate(BaseModel):
    user_name: str
    seats_booked: int = Field(..., gt=0)

class BookingResponse(BaseModel):
    id: int
    show_id: int
    user_name: str
    seats_booked: int
    timestamp: datetime
    show: Optional[ShowResponse] = None
    
    class Config:
        from_attributes = True

