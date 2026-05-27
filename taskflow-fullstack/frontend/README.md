# TaskFlow Frontend

## Overview

This is the React frontend for `taskflow-fullstack`, the main fullstack flagship project in the portfolio.

The frontend currently includes a working application shell with:

- auth screens connected to the live backend
- protected routing
- dashboard data views
- project creation flow
- project board view
- task creation and task status updates
- assignee controls and task filtering

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- custom CSS workspace UI

## Current Features

- login and register screens wired to the backend auth API
- persisted session token handling
- protected route and guest route behavior
- dashboard summary and assigned-task view
- project list and project creation
- board filters by search, priority, and assignee
- task creation inside the board
- task status transitions
- task assignee selection based on project members

## Frontend Structure

- `app` for router setup
- `features/auth` for session state and route guards
- `services` for API-facing modules
- `pages` for dashboard, projects, board, profile, login, and register
- `components/layout` for the app shell
- `types` for API and domain contracts

## Local Run

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 4173
```

Default local app:

- `http://localhost:4173`

Expected backend base URL:

- `http://localhost:8082`

## Build

```bash
cd frontend
npm run build
```

## What This Proves

- React + TypeScript application structuring
- authenticated frontend state handling
- backend integration through service modules
- product-oriented dashboard and board UX
- incremental fullstack delivery rather than static mock UI

## Next Steps

- add drag-and-drop Kanban interactions
- add project member invite flow
- add richer empty states and success feedback
- align final visual polish with portfolio screenshots
