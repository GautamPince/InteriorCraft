from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_db, get_current_user
from app.core.security import verify_password, create_access_token
from app.models.all_models import User
from app.schemas.all_schemas import LoginRequest, TokenResponse, UserOut, StandardResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=StandardResponse[TokenResponse])
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
    
    return StandardResponse(
        success=True,
        message="Login successful",
        data=TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserOut.model_validate(user)
        )
    )

@router.get("/me", response_model=StandardResponse[UserOut])
def get_me(current_user: User = Depends(get_current_user)):
    return StandardResponse(
        success=True,
        message="Current user profile retrieved",
        data=UserOut.model_validate(current_user)
    )
