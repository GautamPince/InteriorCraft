from typing import List, Optional, Any, Generic, TypeVar
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime

T = TypeVar("T")

class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    message: str = "Operation successful"
    errors: Optional[Any] = None

class PaginatedData(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    limit: int
    pages: int

# Auth Schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserOut"

class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Service Schemas
class ServiceBase(BaseModel):
    name: str
    slug: str
    description: str
    short_description: str
    image: str
    starting_price: float
    features: Any = []

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    image: Optional[str] = None
    starting_price: Optional[float] = None
    features: Optional[List[str]] = None

class ServiceOut(ServiceBase):
    id: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Project Schemas
class ProjectImageBase(BaseModel):
    image_url: str
    alt_text: str
    sort_order: int = 0

class ProjectImageCreate(ProjectImageBase):
    pass

class ProjectImageOut(ProjectImageBase):
    id: str
    project_id: str
    model_config = ConfigDict(from_attributes=True)

class ProjectBase(BaseModel):
    title: str
    slug: str
    description: str
    location: str
    city: str
    property_type: str
    design_style: str
    budget_min: float
    budget_max: float
    area_sqft: int
    bedrooms: int
    featured: bool = False
    cover_image: str

class ProjectCreate(ProjectBase):
    images: List[ProjectImageCreate] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    city: Optional[str] = None
    property_type: Optional[str] = None
    design_style: Optional[str] = None
    budget_min: Optional[float] = None
    budget_max: Optional[float] = None
    area_sqft: Optional[int] = None
    bedrooms: Optional[int] = None
    featured: Optional[bool] = None
    cover_image: Optional[str] = None

class ProjectOut(ProjectBase):
    id: str
    created_at: datetime
    updated_at: datetime
    images: List[ProjectImageOut] = []
    model_config = ConfigDict(from_attributes=True)

# Blog Schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    cover_image: str
    category: str
    author: str = "CasaCraft Studio"
    published: bool = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    published: Optional[bool] = None

class BlogPostOut(BlogPostBase):
    id: str
    published_at: datetime
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Consultation Schemas
class ConsultationCreate(BaseModel):
    name: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=8)
    email: EmailStr
    city: str
    property_type: str
    property_size: str
    bedrooms: str
    budget: str
    design_style: str
    preferred_contact_method: str
    message: Optional[str] = None

class ConsultationOut(ConsultationCreate):
    id: str
    status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Contact Schemas
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=8)
    subject: str = Field(..., min_length=2)
    message: str = Field(..., min_length=5)

class ContactMessageOut(ContactMessageCreate):
    id: str
    is_read: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Testimonial Schemas
class TestimonialBase(BaseModel):
    client_name: str
    city: str
    project_title: str
    quote: str
    rating: int = 5
    avatar_url: Optional[str] = None

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialOut(TestimonialBase):
    id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Dashboard Stats Schema
class AdminStatsOut(BaseModel):
    total_projects: int
    featured_projects: int
    consultation_leads: int
    unread_messages: int
    blog_posts: int
