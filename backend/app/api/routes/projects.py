from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
import math

from app.api.dependencies import get_db
from app.models.all_models import Project
from app.schemas.all_schemas import ProjectOut, PaginatedData, StandardResponse

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=StandardResponse[PaginatedData[ProjectOut]])
def get_projects(
    city: Optional[str] = Query(None, description="Filter by city"),
    style: Optional[str] = Query(None, description="Filter by design style"),
    property_type: Optional[str] = Query(None, description="Filter by property type"),
    max_budget: Optional[float] = Query(None, description="Maximum budget threshold in INR"),
    featured: Optional[bool] = Query(None, description="Filter featured projects"),
    search: Optional[str] = Query(None, description="Search term across title and location"),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Project)

    if city:
        query = query.filter(Project.city.ilike(f"%{city}%"))
    if style:
        query = query.filter(Project.design_style.ilike(f"%{style}%"))
    if property_type:
        query = query.filter(Project.property_type.ilike(f"%{property_type}%"))
    if max_budget is not None:
        query = query.filter(Project.budget_min <= max_budget)
    if featured is not None:
        query = query.filter(Project.featured == featured)
    if search:
        query = query.filter(
            or_(
                Project.title.ilike(f"%{search}%"),
                Project.location.ilike(f"%{search}%"),
                Project.description.ilike(f"%{search}%")
            )
        )

    total = query.count()
    pages = math.ceil(total / limit) if total > 0 else 1
    
    projects = query.order_by(Project.created_at.desc()).offset((page - 1) * limit).limit(limit).all()

    return StandardResponse(
        success=True,
        message="Projects retrieved successfully",
        data=PaginatedData(
            items=[ProjectOut.model_validate(p) for p in projects],
            total=total,
            page=page,
            limit=limit,
            pages=pages
        )
    )

@router.get("/{slug}", response_model=StandardResponse[ProjectOut])
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with slug '{slug}' not found"
        )
    return StandardResponse(
        success=True,
        message="Project detail retrieved successfully",
        data=ProjectOut.model_validate(project)
    )
