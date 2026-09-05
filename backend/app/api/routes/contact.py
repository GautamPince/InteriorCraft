from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models.all_models import ContactMessage
from app.schemas.all_schemas import ContactMessageCreate, ContactMessageOut, StandardResponse

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=StandardResponse[ContactMessageOut], status_code=status.HTTP_201_CREATED)
def submit_contact_message(data: ContactMessageCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(**data.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)

    return StandardResponse(
        success=True,
        message="Your message has been sent successfully. We will get back to you soon.",
        data=ContactMessageOut.model_validate(msg)
    )
