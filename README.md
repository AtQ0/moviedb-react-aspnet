# Movie DB

Monorepo with two frontends (React and Angular) and one ASP.NET Core minimal API backend. Both frontends talk to the same API. Browse movies: home (trending, rated, playing) and discover by genre or search.

## Stack

- **Frontend (React):** Vite + React + TypeScript + Tailwind + shadcn/ui
- **Frontend (Angular):** Angular + TypeScript
- **Backend:** ASP.NET Core minimal API + .NET

## Design

UI mockups and sketches: [Figma](https://www.figma.com/design/CRWicww7X51RPQMUclcHtd/movieDb?node-id=0-1&m=dev&t=IQeSOMBBADtV5JlP-1)

## Structure

- `frontend-react/` — React (Vite) SPA
- `frontend-angular/` — Angular SPA
- `backend/` — ASP.NET Core API

In development, both frontends proxy `/api` requests to the backend.

## Prerequisites

- .NET SDK
- Node.js (LTS)

## Run locally

**Terminal 1 (backend):**
```bash
dotnet run --project backend
```


**Terminal 2 (React frontend):**
```bash
cd frontend-react && npm install && npm run dev
```
Open http://localhost:5173


**Terminal 3 (Angular frontend):**
```bash
cd frontend-angular && npm install && ng serve
```
Open http://localhost:4200

Run one frontend at a time (or both in different browsers). Backend runs on port 5223; both frontends proxy /api to it.


## API (backend)

* GET /api/movies/discover — Discover movies. 
* GET /api/movies/genres — List of genres (for filter UI).
* GET /api/movies/trending — Trending movies.
* GET /api/movies/rated — Top rated.
* GET /api/movies/playing — Now playing.

