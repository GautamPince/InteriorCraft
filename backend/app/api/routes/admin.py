from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.api.dependencies import get_db, require_admin, require_editor_or_admin
from app.models.all_models import (
    User, Project, ProjectImage, Service, BlogPost, Consultation, ContactMessage
)
from app.schemas.all_schemas import (
    ProjectCreate, ProjectUpdate, ProjectOut,
    ServiceCreate, ServiceUpdate, ServiceOut,
    BlogPostCreate, BlogPostUpdate, BlogPostOut,
    ConsultationOut, ContactMessageOut, AdminStatsOut, StandardResponse
)

router = APIRouter(prefix="/admin", tags=["Admin Dashboard"])

@router.get("/stats", response_model=StandardResponse[AdminStatsOut])
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    total_projects = db.query(Project).count()
    featured_projects = db.query(Project).filter(Project.featured == True).count()
    consultation_leads = db.query(Consultation).count()
    unread_messages = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    blog_posts = db.query(BlogPost).count()

    return StandardResponse(
        success=True,
        message="Admin statistics retrieved",
        data=AdminStatsOut(
            total_projects=total_projects,
            featured_projects=featured_projects,
            consultation_leads=consultation_leads,
            unread_messages=unread_messages,
            blog_posts=blog_posts
        )
    )

# --- Projects Management ---
@router.post("/projects", response_model=StandardResponse[ProjectOut], status_code=status.HTTP_201_CREATED)
def create_project(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    existing = db.query(Project).filter(Project.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Project slug already exists")

    images_data = data.images
    project_dict = data.model_dump(exclude={"images"})
    project = Project(**project_dict)
    db.add(project)
    db.flush()

    for idx, img in enumerate(images_data):
        db.add(ProjectImage(
            project_id=project.id,
            image_url=img.image_url,
            alt_text=img.alt_text,
            sort_order=img.sort_order or idx
        ))

    db.commit()
    db.refresh(project)
    return StandardResponse(success=True, message="Project created successfully", data=ProjectOut.model_validate(project))

@router.put("/projects/{id}", response_model=StandardResponse[ProjectOut])
def update_project(
    id: str,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_dict = data.model_dump(exclude_unset=True)
    for key, val in update_dict.items():
        setattr(project, key, val)

    db.commit()
    db.refresh(project)
    return StandardResponse(success=True, message="Project updated successfully", data=ProjectOut.model_validate(project))

@router.delete("/projects/{id}", response_model=StandardResponse[dict])
def delete_project(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()
    return StandardResponse(success=True, message="Project deleted successfully", data={"id": id})

# --- Services Management ---
@router.post("/services", response_model=StandardResponse[ServiceOut], status_code=status.HTTP_201_CREATED)
def create_service(
    data: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    existing = db.query(Service).filter(Service.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service slug already exists")

    service = Service(**data.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return StandardResponse(success=True, message="Service created successfully", data=ServiceOut.model_validate(service))

@router.put("/services/{id}", response_model=StandardResponse[ServiceOut])
def update_service(
    id: str,
    data: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    update_dict = data.model_dump(exclude_unset=True)
    for key, val in update_dict.items():
        setattr(service, key, val)

    db.commit()
    db.refresh(service)
    return StandardResponse(success=True, message="Service updated successfully", data=ServiceOut.model_validate(service))

@router.delete("/services/{id}", response_model=StandardResponse[dict])
def delete_service(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    db.delete(service)
    db.commit()
    return StandardResponse(success=True, message="Service deleted successfully", data={"id": id})

# --- Blog Posts Management ---
@router.post("/blog", response_model=StandardResponse[BlogPostOut], status_code=status.HTTP_201_CREATED)
def create_blog_post(
    data: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    existing = db.query(BlogPost).filter(BlogPost.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Blog article slug already exists")

    post = BlogPost(**data.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return StandardResponse(success=True, message="Blog article created successfully", data=BlogPostOut.model_validate(post))

@router.put("/blog/{id}", response_model=StandardResponse[BlogPostOut])
def update_blog_post(
    id: str,
    data: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog article not found")

    update_dict = data.model_dump(exclude_unset=True)
    for key, val in update_dict.items():
        setattr(post, key, val)

    db.commit()
    db.refresh(post)
    return StandardResponse(success=True, message="Blog article updated successfully", data=BlogPostOut.model_validate(post))

@router.delete("/blog/{id}", response_model=StandardResponse[dict])
def delete_blog_post(
    id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    post = db.query(BlogPost).filter(BlogPost.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog article not found")

    db.delete(post)
    db.commit()
    return StandardResponse(success=True, message="Blog article deleted successfully", data={"id": id})

# --- Consultation Leads & Messages ---
@router.get("/consultations", response_model=StandardResponse[List[ConsultationOut]])
def get_admin_consultations(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    consultations = db.query(Consultation).order_by(Consultation.created_at.desc()).all()
    return StandardResponse(success=True, message="Consultation leads retrieved", data=[ConsultationOut.model_validate(c) for c in consultations])

@router.get("/messages", response_model=StandardResponse[List[ContactMessageOut]])
def get_admin_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_editor_or_admin)
):
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
    return StandardResponse(success=True, message="Contact messages retrieved", data=[ContactMessageOut.model_validate(m) for m in messages])
