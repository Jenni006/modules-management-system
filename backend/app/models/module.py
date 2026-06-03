from sqlalchemy import Column, String, Text, ARRAY, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from app.database.connection import Base


class ModuleStatus(str, enum.Enum):
    active = "active"
    draft = "draft"
    pending = "pending"


class Module(Base):
    __tablename__ = "modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    program = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    target_group = Column(String(255), nullable=False)
    service_component = Column(String(255), nullable=False)
    quick_summary = Column(Text, nullable=True)
    tags = Column(ARRAY(String), nullable=True, default=[])
    status = Column(
        Enum(ModuleStatus),
        nullable=False,
        default=ModuleStatus.draft
    )
    publish_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )