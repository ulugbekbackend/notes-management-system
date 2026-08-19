# Notes Management System

A full-stack notes app with user accounts, categories, tags, favorites,
archiving, and a trash/restore flow. Backend is a Django REST API secured
with JWT; frontend is a React (Vite) single-page app.

## Features

- **Auth** — register/login with JWT access + refresh tokens, automatic
  silent token refresh on 401, protected frontend routes.
- **Notes** — create, edit, favorite, archive, soft-delete (trash) and
  restore. Each note can have one category and multiple tags.
- **Categories & Tags** — per-user, so one account's data never leaks into
  another's.
- **Dashboard** — search, filter, and stats overview of your notes.
- **Ownership checks** — a user can only attach their own categories/tags
  to their own notes.
- **API hardening** — request throttling, DB indexes on the fields the
  dashboard filters by, and `select_related`/`prefetch_related` to avoid
  N+1 queries.

## Tech stack

| Layer    | Tech |
|----------|------|
| Frontend | React 19, Vite, React Router, Axios, Framer Motion, react-hot-toast |
| Backend  | Django 6, Django REST Framework, Simple JWT |
| Database | PostgreSQL (via `DATABASE_URL`), falls back to SQLite for local dev |
| Auth     | JWT (access + refresh) |

## Project structure

```
NotesManagementSystem/
├── backend/                # Django REST API
│   ├── accounts/           # registration
│   ├── categories/         # per-user categories
│   ├── notes/               # notes CRUD, trash/restore
│   ├── tags/                # per-user tags
│   ├── config/               # settings, urls, wsgi/asgi
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/                # React (Vite) SPA
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, NoteCard, Modal, etc.
│   │   ├── pages/            # Login, Register, Dashboard, Settings
│   │   ├── context/          # AuthContext
│   │   ├── services/         # API service wrappers
│   │   └── api/               # axios instance + interceptors
│   ├── package.json
│   └── .env.example
├── CHANGELOG.md             # history of fixes/improvements made to this project
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (optional — SQLite is used automatically if `DATABASE_URL`
  is not set)

### Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # venv\Scripts\activate on Windows
pip install -r requirements.txt

cp .env.example .env          # fill in SECRET_KEY / DATABASE_URL

python manage.py migrate
python manage.py createsuperuser   # optional, for /admin access
python manage.py runserver
```

The API will run at `http://127.0.0.1:8000`.

### Frontend setup

```bash
cd frontend
npm install

cp .env.example .env          # defaults already match the backend above

npm run dev
```

The app will run at `http://localhost:5173`.

## Environment variables

**backend/.env**

| Variable | Description |
|---|---|
| `SECRET_KEY` | Django secret key. Generate one with `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DEBUG` | `True` for local dev only, must be `False` in production |
| `ALLOWED_HOSTS` | Comma-separated hostnames the API may serve |
| `DATABASE_URL` | Postgres connection string; falls back to local SQLite if unset |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins allowed to call the API |
| `SECURE_SSL_REDIRECT` | Only relevant when `DEBUG=False` |
| `LOG_LEVEL` | Django log level |

**frontend/.env**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL, no trailing slash / no `/api` suffix |

> Never commit a real `.env` file — only the `.env.example` templates are
> tracked in git.

## API overview

All endpoints below are prefixed with `/api/`.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register/` | Create a new user account |
| `POST` | `/login/` | Obtain a JWT access + refresh token pair |
| `POST` | `/token/refresh/` | Exchange a refresh token for a new access token |
| `GET/POST` | `/notes/` | List / create notes |
| `GET/PATCH/DELETE` | `/notes/{id}/` | Retrieve, update, or delete a note |
| `GET/POST` | `/categories/` | List / create categories |
| `GET/PATCH/DELETE` | `/categories/{id}/` | Retrieve, update, or delete a category |
| `GET/POST` | `/tags/` | List / create tags |
| `GET/PATCH/DELETE` | `/tags/{id}/` | Retrieve, update, or delete a tag |

## Available scripts

**Backend** (`backend/`)
- `python manage.py runserver` — start the dev server
- `python manage.py migrate` — apply DB migrations
- `python manage.py test` — run the test suite

**Frontend** (`frontend/`)
- `npm run dev` — start the Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Deployment notes

- Set `DEBUG=False`, a real `SECRET_KEY`, and a Postgres `DATABASE_URL`
  before deploying the backend anywhere public.
- Build the frontend with `npm run build` and serve the `dist/` folder as
  static files (Vercel, Netlify, S3 + CloudFront, etc.), pointing
  `VITE_API_URL` at your deployed API.

## Contributing

Issues and pull requests are welcome. Please open an issue describing the
change before submitting a large PR.

