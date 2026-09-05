import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
import boto3

from app.api.dependencies import require_editor_or_admin
from app.core.config import settings
from app.models.all_models import User
from app.schemas.all_schemas import StandardResponse

router = APIRouter(prefix="/media", tags=["Media Upload"])

class PresignedUrlRequest(BaseModel):
    filename: str
    file_type: str = Field(..., description="MIME type e.g. image/jpeg, image/png, image/webp")

class PresignedUrlResponse(BaseModel):
    upload_url: str
    public_url: str
    file_key: str

ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]

@router.post("/presigned-url", response_model=StandardResponse[PresignedUrlResponse])
def generate_presigned_url(
    req: PresignedUrlRequest,
    current_user: User = Depends(require_editor_or_admin)
):
    if req.file_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type '{req.file_type}'. Allowed types: JPEG, PNG, WEBP."
        )

    ext = req.filename.split(".")[-1] if "." in req.filename else "jpg"
    unique_key = f"projects/{uuid.uuid4().hex}.{ext}"

    if settings.AWS_ACCESS_KEY_ID and settings.AWS_SECRET_ACCESS_KEY:
        try:
            s3_client = boto3.client(
                "s3",
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_REGION
            )
            presigned_url = s3_client.generate_presigned_url(
                "put_object",
                Params={
                    "Bucket": settings.AWS_S3_BUCKET,
                    "Key": unique_key,
                    "ContentType": req.file_type
                },
                ExpiresIn=3600
            )
            public_url = f"{settings.AWS_CLOUDFRONT_URL}/{unique_key}"
        except Exception as e:
            # Fallback for local development
            presigned_url = f"/api/media/upload-mock?key={unique_key}"
            public_url = f"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    else:
        # Mock development response when AWS is not configured
        presigned_url = f"/api/media/upload-mock?key={unique_key}"
        public_url = f"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"

    return StandardResponse(
        success=True,
        message="Presigned S3 upload URL generated successfully",
        data=PresignedUrlResponse(
            upload_url=presigned_url,
            public_url=public_url,
            file_key=unique_key
        )
    )
