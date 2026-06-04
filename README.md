# Modules Management System

A full-stack modules management system built with React, Carbon Design System, FastAPI, and PostgreSQL.  
Supports full CRUD operations with filtering, cascading dropdown logic, and real-time API integration.

## Live Demo

- Frontend: https://modules-management-system.vercel.app
- Backend API: https://modules-management-system.onrender.com  
- API Docs: https://modules-management-system.onrender.com/docs  

## Tech Stack

Frontend:
- React (Vite)
- TypeScript
- Carbon Design System
- React Router
- TanStack Query
- Axios

Backend:
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Alembic (optional)

## Project Structure

```
modules-management-system/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   │   ├── __init__.py
│   │   │   └── connection.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── module.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   └── modules.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── module.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── module_service.py
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateModuleDrawer.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── StatusTag.tsx
│   │   │   └── TopNav.tsx
│   │   ├── data/
│   │   │   ├── dropdownOptions.ts
│   │   │   └── mockModules.ts
│   │   ├── hooks/
│   │   │   └── useModules.ts
│   │   ├── pages/
│   │   │   ├── CreateModulePage.tsx
│   │   │   ├── EditModulePage.tsx
│   │   │   ├── ModulesPage.tsx
│   │   │   └── ViewModulePage.tsx
│   │   ├── services/
│   │   │   └── modules.ts
│   │   ├── types/
│   │   │   └── module.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js v18+
- Python 3.10+
- PostgreSQL 14+

## Database Setup

```sql
CREATE DATABASE modules_db;
```

## Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```


Create `backend/.env`:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/modules_db
```

```bash
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

## Frontend Setup


```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /modules/ | Get all modules |
| POST | /modules/ | Create a module |
| GET | /modules/{id} | Get module by id |
| PUT | /modules/{id} | Update module |
| DELETE | /modules/{id} | Delete module |

## Features

Modules Dashboard:
- Search modules by name, author, program
- Filter by program, category, tags, collaborators
- Expandable rows with additional details
- Status tracking (Active / Draft)

Create Module:
- Drawer-based form UI
- Cascading dropdown logic:
  Program → Category → Target Group → Service Component
- Save Draft / Create and Publish
- React Query mutation with auto refetch

View Module:
- Read-only module details page
- Full metadata display

Edit Module:
- Pre-filled form
- Update via API
- Instant UI sync

## Development Notes

- Frontend and backend must run simultaneously
- Backend uses SQLAlchemy create_all() for auto schema creation
- CORS enabled for http://localhost:5173
- Reset DB if schema changes:

```bash
cd backend
python -c "from app.database.connection import Base, engine; Base.metadata.drop_all(bind=engine); Base.metadata.create_all(bind=engine)"
```
