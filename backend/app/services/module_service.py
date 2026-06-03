from sqlalchemy.orm import Session
from app.models.module import Module
from app.schemas.module import ModuleCreate, ModuleUpdate
from uuid import UUID


def get_all_modules(db: Session):
    return db.query(Module).all()


def get_module_by_id(db: Session, module_id: UUID):
    return db.query(Module).filter(Module.id == module_id).first()


def create_module(db: Session, payload: ModuleCreate):
    module = Module(**payload.model_dump())
    db.add(module)
    db.commit()
    db.refresh(module)
    return module


def update_module(db: Session, module_id: UUID, payload: ModuleUpdate):
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        return None
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(module, key, value)
    db.commit()
    db.refresh(module)
    return module