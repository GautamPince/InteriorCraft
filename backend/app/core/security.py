from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
import hashlib

from app.core.config import settings

# Robust fallback password hasher
try:
    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception:
            # Fallback check for hashlib encoded password
            return get_password_hash(plain_password) == hashed_password
    def get_password_hash(password: str) -> str:
        try:
            return pwd_context.hash(password)
        except Exception:
            return hashlib.sha256((password + settings.JWT_SECRET_KEY).encode('utf-8')).hexdigest()
except Exception:
    def get_password_hash(password: str) -> str:
        return hashlib.sha256((password + settings.JWT_SECRET_KEY).encode('utf-8')).hexdigest()
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return get_password_hash(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except Exception:
        return None
