from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.module import ModuleCreate, ModuleUpdate, ModuleResponse
from app.services import module_service
from typing import List
from uuid import UUID

router = APIRouter(prefix="/modules", tags=["Modules"])


@router.get("/", response_model=List[ModuleResponse])
def list_modules(db: Session = Depends(get_db)):
    return module_service.get_all_modules(db)


@router.get("/{module_id}", response_model=ModuleResponse)
def get_module(module_id: UUID, db: Session = Depends(get_db)):
    module = module_service.get_module_by_id(db, module_id)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module


@router.post("/", response_model=ModuleResponse, status_code=201)
def create_module(payload: ModuleCreate, db: Session = Depends(get_db)):
    return module_service.create_module(db, payload)


@router.put("/{module_id}", response_model=ModuleResponse)
def update_module(
    module_id: UUID,
    payload: ModuleUpdate,
    db: Session = Depends(get_db)
):
    module = module_service.update_module(db, module_id, payload)
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    return module