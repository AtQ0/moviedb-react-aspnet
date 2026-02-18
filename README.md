# Movie DB (React + ASP.NET Core)

Monorepo with a Vite React frontend and an ASP.NET Core minimal API backend.

## Stack
- Frontend: Vite + React + TypeScript + Tailwind + shadcn/ui
- Backend: ASP.NET Core minimal API + .NET

## Structure
- `frontend/` — React SPA
- `backend/` — ASP.NET Core API

In development, the frontend proxies `/api` requests to the backend.

## Prerequisites
- .NET SDK
- Node.js (LTS)

## Run locally

Terminal 1 (backend):
```bash
dotnet run --project backend
