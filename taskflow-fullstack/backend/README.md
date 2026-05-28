# TaskFlow Backend

## Overview

This is the Spring Boot backend for `taskflow-fullstack`, the flagship fullstack project in this portfolio ecosystem.

Live backend health check:

- https://taskflow-backend-yosc.onrender.com/api/v1/auth/health

The backend currently provides a working product foundation for:

- JWT-based authentication
- project creation and listing
- task creation and status management
- project board data
- dashboard summary data
- project member lookup for assignee workflows
- seeded demo workspace for recruiter walkthroughs

## Tech Stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- H2 test profile
- PostgreSQL-ready configuration
- Docker
- OpenAPI / Springdoc

## Current Features

- `register`, `login`, `logout`, and `me` auth endpoints
- seeded application roles: `ROLE_ADMIN`, `ROLE_MANAGER`, `ROLE_MEMBER`
- project creation, project list, project detail
- project member listing
- task creation
- task list by project
- task status update
- task assignee update
- dashboard summary, assigned tasks, and upcoming deadlines
- centralized exception handling
- integration test coverage across auth, projects, tasks, and dashboard
- deployed Render runtime connected to hosted PostgreSQL
- CORS support for Vercel production and preview domains

## Architecture

- feature-based backend modules: `auth`, `user`, `project`, `task`, `dashboard`, `common`
- stateless JWT auth with custom security filter chain
- DTO-driven API boundaries
- service-layer business rules for membership, assignment, and task flow
- shared API response structure for frontend integration

## Local Run

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=test -Dspring-boot.run.useTestClasspath=true
```

Default local API:

- `http://localhost:8082`

## Testing

```bash
cd backend
./mvnw -q test
```

## What This Proves

- secure Spring Boot API design
- feature-based backend organization
- real frontend-backend integration readiness
- task and project workflow modeling
- recruiter-friendly backend implementation quality
- deployment-ready Spring Boot configuration

## Next Steps

- add richer dashboard metrics
- add Swagger screenshots and example requests for the final repo presentation
- add Flyway migrations for stronger production database control
