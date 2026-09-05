import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CasaCraft Interiors API"
    API_V1_STR: str = "/api"
    
    # Security
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "casacraft_super_secret_jwt_key_2026_production_grade")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))
    
    # Database (defaults to SQLite for instant local execution without requiring running Postgres instance, can be overridden by env)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./casacraft.db")
    
    # AWS S3 & CloudFront
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    AWS_REGION: str = os.getenv("AWS_REGION", "ap-south-1")
    AWS_S3_BUCKET: str = os.getenv("AWS_S3_BUCKET", "casacraft-media-bucket")
    AWS_CLOUDFRONT_URL: str = os.getenv("AWS_CLOUDFRONT_URL", "https://d1111111111111.cloudfront.net")
    
    # Contact / Admin Email
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@casacraft.in")

    class Config:
        case_sensitive = True

settings = Settings()
