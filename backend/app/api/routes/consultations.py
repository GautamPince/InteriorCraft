from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models.all_models import Consultation
from app.schemas.all_schemas import ConsultationCreate, ConsultationOut, StandardResponse

router = APIRouter(prefix="/consultations", tags=["Consultations"])

@router.post("", response_model=StandardResponse[ConsultationOut], status_code=status.HTTP_201_CREATED)
def submit_consultation(data: ConsultationCreate, db: Session = Depends(get_db)):
    consultation = Consultation(**data.model_dump())
    db.add(consultation)
    db.commit()
    db.refresh(consultation)

    return StandardResponse(
        success=True,
        message="Thank you! Our design expert will contact you shortly.",
        data=ConsultationOut.model_validate(consultation)
    )
