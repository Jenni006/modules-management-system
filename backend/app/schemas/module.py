from pydantic import BaseModel, UUID4
from typing import Optional, List
from datetime import datetime
from app.models.module import ModuleStatus


class ModuleBase(BaseModel):
    name: str
    author: str
    program: str
    category: str
    target_group: str
    service_component: str
    quick_summary: Optional[str] = None
    tags: Optional[List[str]] = []
    status: Optional[ModuleStatus] = ModuleStatus.draft
    publish_date: Optional[datetime] = None


class ModuleCreate(ModuleBase):
    pass


class ModuleUpdate(BaseModel):
    name: Optional[str] = None
    author: Optional[str] = None
    program: Optional[str] = None
    category: Optional[str] = None
    target_group: Optional[str] = None
    service_component: Optional[str] = None
    quick_summary: Optional[str] = None
    tags: Optional[List[str]] = None
    status: Optional[ModuleStatus] = None
    publish_date: Optional[datetime] = None


class ModuleResponse(ModuleBase):
    id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True