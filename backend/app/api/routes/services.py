from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models.all_models import Service
from app.schemas.all_schemas import ServiceOut, StandardResponse

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=StandardResponse[List[ServiceOut]])
def get_services(db: Session = Depends(get_db)):
    services = db.query(Service).order_by(Service.name.asc()).all()
    return StandardResponse(
        success=True,
        message="Services retrieved successfully",
        data=[ServiceOut.model_validate(s) for s in services]
    )

@router.get("/{slug}", response_model=StandardResponse[ServiceOut])
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with slug '{slug}' not found"
        )
    return StandardResponse(
        success=True,
        message="Service detail retrieved",
        data=ServiceOut.model_validate(service)
    )
