from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Venue
from schemas import VenueResponse

router = APIRouter(tags=["venues"])

@router.get("/venues", response_model=List[VenueResponse])
def list_venues(db: Session = Depends(get_db)):
    venues = db.query(Venue).all()
    return venues

