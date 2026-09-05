from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import math

from app.api.dependencies import get_db
from app.models.all_models import BlogPost
from app.schemas.all_schemas import BlogPostOut, PaginatedData, StandardResponse

router = APIRouter(prefix="/blog", tags=["Design Ideas & Blog"])

@router.get("", response_model=StandardResponse[PaginatedData[BlogPostOut]])
def get_blog_posts(
    category: Optional[str] = Query(None, description="Filter by blog category"),
    search: Optional[str] = Query(None, description="Search in blog titles and excerpt"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.published == True)

    if category:
        query = query.filter(BlogPost.category.ilike(f"%{category}%"))
    if search:
        query = query.filter(BlogPost.title.ilike(f"%{search}%"))

    total = query.count()
    pages = math.ceil(total / limit) if total > 0 else 1
    
    posts = query.order_by(BlogPost.published_at.desc()).offset((page - 1) * limit).limit(limit).all()

    return StandardResponse(
        success=True,
        message="Blog posts retrieved successfully",
        data=PaginatedData(
            items=[BlogPostOut.model_validate(p) for p in posts],
            total=total,
            page=page,
            limit=limit,
            pages=pages
        )
    )

@router.get("/{slug}", response_model=StandardResponse[BlogPostOut])
def get_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.published == True).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog article with slug '{slug}' not found"
        )
    return StandardResponse(
        success=True,
        message="Blog article retrieved successfully",
        data=BlogPostOut.model_validate(post)
    )
