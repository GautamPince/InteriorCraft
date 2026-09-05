from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models.all_models import Testimonial
from app.schemas.all_schemas import TestimonialOut, StandardResponse

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.get("", response_model=StandardResponse[List[TestimonialOut]])
def get_testimonials(db: Session = Depends(get_db)):
    testimonials = db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()
    return StandardResponse(
        success=True,
        message="Testimonials retrieved successfully",
        data=[TestimonialOut.model_validate(t) for t in testimonials]
    )
