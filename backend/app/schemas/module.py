from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum
from uuid import UUID

class ModuleStatus(str, Enum):
    active = "active"
    draft = "draft"
    pending = "pending"


class ModuleCreate(BaseModel):
    name: str
    author: Optional[str] = None
    program: Optional[str] = None
    category: Optional[str] = None
    target_group: Optional[str] = None
    service_component: Optional[str] = None
    quick_summary: Optional[str] = None
    tags: Optional[List[str]] = []
    status: Optional[ModuleStatus] = ModuleStatus.draft
    publish_date: Optional[datetime] = None


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
    

class ModuleResponse(BaseModel):
    id: UUID
    name: str
    author: Optional[str] = None
    program: Optional[str] = None
    category: Optional[str] = None
    target_group: Optional[str] = None
    service_component: Optional[str] = None
    quick_summary: Optional[str] = None
    tags: Optional[List[str]] = []
    status: ModuleStatus
    publish_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True