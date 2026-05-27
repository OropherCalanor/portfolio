# TaskFlow Fullstack

## Overview

`taskflow-fullstack` is the flagship fullstack product in this portfolio ecosystem.

It is designed to show that the backend foundations proven in earlier Spring Boot projects can scale into a real product with:

- secure authentication
- project and task workflows
- board-based collaboration
- dashboard visibility
- live frontend-backend integration

## Product Positioning

TaskFlow is a compact project management platform inspired by lightweight Jira / Trello / Linear workflows.

The goal is not enterprise complexity.

The goal is to prove fullstack architecture, product thinking, and implementation quality in one recruiter-facing project.

## Current Status

`TaskFlow` is now in a strong `in-progress` state.

Working slices currently include:

- auth flow
- project creation
- project board navigation
- task creation
- task status updates
- assignee controls
- dashboard refresh and summary cards

## Project Structure

```text
taskflow-fullstack/
├── backend/
└── frontend/
```

## Backend Highlights

- Spring Boot + Spring Security + JWT
- feature-based modules
- project, task, dashboard, and auth endpoints
- integration tests
- PostgreSQL-ready config with test-profile local verification

See:

- [backend/README.md](/Users/ruhatkaratas/Documents/Portfolio%20Website/taskflow-fullstack/backend/README.md:1)

## Frontend Highlights

- React + TypeScript + Vite
- protected routing and auth context
- live dashboard and project screens
- board filters, task creation, and assignee workflows
- dark workspace UI aligned with the portfolio’s visual direction

See:

- [frontend/README.md](/Users/ruhatkaratas/Documents/Portfolio%20Website/taskflow-fullstack/frontend/README.md:1)

## What This Project Proves

- end-to-end fullstack architecture
- React and Spring Boot integration
- JWT-secured application flows
- product-oriented UI thinking
- incremental engineering and verification discipline

## Next Steps

- project member invite / add-member flow
- drag-and-drop board interactions
- richer analytics and dashboard breakdowns
- final screenshots, case study polish, and deployment path
