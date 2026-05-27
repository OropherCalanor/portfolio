# Project Blueprint: taskflow-fullstack

## Goal

Build a flagship fullstack project management application that proves end-to-end product development across:

- Spring Boot backend architecture
- React and TypeScript frontend implementation
- PostgreSQL relational modeling
- JWT-based authentication and authorization
- dashboard and Kanban-style workflow UX
- real frontend-backend integration

This project should become the strongest hiring signal in the portfolio.

## Portfolio Purpose

`taskflow-fullstack` is the main fullstack flagship project in the portfolio ecosystem.

Its job is to show that the backend and auth foundations already proven in:

- `spring-employee-management-api`
- `spring-security-jwt-auth`

can now be reused inside a more serious product with real workflows and real UI complexity.

Recruiter takeaway:

"This candidate can build more than isolated APIs. They can deliver a structured fullstack product with authentication, collaboration logic, dashboards, and clean architecture."

## What This Project Must Prove

- end-to-end fullstack architecture
- secure auth integration
- backend module design
- React application structure
- state management
- form handling and validation
- Kanban interaction patterns
- relational domain modeling
- role-aware product thinking
- Dockerized local setup
- documentation and case study quality

## Product Positioning

TaskFlow is a compact project and task management platform for small teams.

It should feel like a lighter Jira / Trello / Linear-inspired product, but simpler and easier to review.

The goal is not enterprise complexity.

The goal is to show product-quality architecture and workflow thinking.

## V1 Scope

Keep V1 focused and shippable.

### V1 should include

- registration and login
- project creation and management
- project membership
- task creation and management
- task status workflow
- task priority
- task due dates
- task assignment
- dashboard overview
- task filtering and search
- Kanban board view

### V1 should not include yet

- comments
- file attachments
- notifications
- audit logs
- activity feeds
- real-time sync
- email workflows
- advanced analytics

## Recommended Stack

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- Bean Validation
- Lombok
- MapStruct or manual mapping
- Springdoc OpenAPI
- Docker
- Docker Compose

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Zustand
- React Hook Form
- Zod
- Framer Motion if useful

### Quality / Workflow

- Postman
- JUnit / Mockito
- integration tests
- ESLint
- Prettier

## Architecture Direction

This project should use:

- feature-based backend modular structure
- feature-based frontend structure
- DTO-driven API contracts
- JWT-based stateless auth
- service-layer business rules
- reusable UI primitives plus feature components

## Backend Structure

```text
src/main/java/com/ruhatkaratas/taskflow
│
├── auth
│   ├── controller
│   ├── dto
│   ├── service
│   ├── security
│   └── mapper
├── user
├── project
├── task
├── dashboard
├── common
│   ├── config
│   ├── dto
│   ├── exception
│   ├── response
│   └── util
└── TaskflowApplication.java
```

## Frontend Structure

```text
src
│
├── app
├── assets
├── components
│   ├── ui
│   ├── layout
│   └── shared
├── features
│   ├── auth
│   ├── dashboard
│   ├── projects
│   └── tasks
├── hooks
├── lib
├── pages
├── routes
├── services
├── store
├── types
└── main.tsx
```

## Core Roles

Use three application roles:

- `ADMIN`
- `MANAGER`
- `MEMBER`

### Permission intention

- `ADMIN`
  - platform-level control
  - full project visibility
- `MANAGER`
  - can create and manage projects
  - can manage tasks within owned or managed projects
- `MEMBER`
  - can view assigned or joined workspaces
  - can update task state depending on project rules

## Core Domain Model

### User

Fields:

- `id`
- `firstName`
- `lastName`
- `email`
- `password`
- `role`
- `status`
- `createdAt`
- `updatedAt`

### Project

Fields:

- `id`
- `name`
- `key`
- `description`
- `status`
- `owner`
- `createdAt`
- `updatedAt`

### ProjectMember

Fields:

- `id`
- `project`
- `user`
- `membershipRole`
- `joinedAt`

### Task

Fields:

- `id`
- `project`
- `title`
- `description`
- `status`
- `priority`
- `assignee`
- `reporter`
- `dueDate`
- `createdAt`
- `updatedAt`

## Recommended Enums

### ProjectStatus

- `PLANNING`
- `ACTIVE`
- `ON_HOLD`
- `COMPLETED`
- `ARCHIVED`

### TaskStatus

- `BACKLOG`
- `TODO`
- `IN_PROGRESS`
- `IN_REVIEW`
- `DONE`
- `CANCELLED`

### TaskPriority

- `LOW`
- `MEDIUM`
- `HIGH`
- `CRITICAL`

### UserStatus

- `ACTIVE`
- `INACTIVE`

### MembershipRole

- `OWNER`
- `MANAGER`
- `CONTRIBUTOR`
- `VIEWER`

## Relationships

- one `User` can own many `Project` records
- one `Project` can have many `ProjectMember` records
- one `User` can belong to many projects through `ProjectMember`
- one `Project` can have many `Task` records
- one `Task` can be assigned to one user
- one `Task` can have one reporter

## Authentication Strategy

Reuse lessons and patterns from `spring-security-jwt-auth`.

Recommended approach:

- keep auth inside this repo, not as a remote microservice
- reuse JWT flow and role guard patterns
- adapt refresh token logic only if needed for product UX

### V1 auth feature set

- register
- login
- current user
- logout
- protected routes
- role-based endpoint access

## Backend Feature Modules

### 1. Auth

- register
- login
- current user
- access control helpers

### 2. Users

- current user profile
- list project members where relevant

### 3. Projects

- create project
- update project
- delete project
- list projects
- view single project
- add project members

### 4. Tasks

- create task
- update task
- delete task
- list tasks
- filter tasks
- assign task
- move task status

### 5. Dashboard

- task counts by status
- task counts by priority
- upcoming deadlines
- per-user assigned task summary

## API Surface Suggestion

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Projects

- `GET /api/v1/projects`
- `POST /api/v1/projects`
- `GET /api/v1/projects/{id}`
- `PUT /api/v1/projects/{id}`
- `DELETE /api/v1/projects/{id}`
- `POST /api/v1/projects/{id}/members`

### Tasks

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `GET /api/v1/tasks/{id}`
- `PUT /api/v1/tasks/{id}`
- `DELETE /api/v1/tasks/{id}`
- `PATCH /api/v1/tasks/{id}/status`
- `PATCH /api/v1/tasks/{id}/assignee`

### Dashboard

- `GET /api/v1/dashboard/summary`
- `GET /api/v1/dashboard/my-tasks`

## Frontend Screens

### Public

- login page
- register page

### Authenticated

- dashboard page
- projects list page
- project detail page
- Kanban board page
- tasks list view
- profile page

## Frontend UX Requirements

### Dashboard

Must show:

- project count
- assigned task count
- task count by status
- overdue or upcoming tasks

### Project List

Must support:

- search
- filter by status
- clear project cards or table layout

### Project Detail

Must show:

- project summary
- members
- recent tasks
- quick navigation to board

### Kanban Board

Must show:

- columns by task status
- task cards with priority and assignee
- simple movement interaction

Drag-and-drop is optional in the first slice.

Even button-based or select-based status movement is acceptable if it keeps the implementation clean.

## State Management Plan

Use Zustand for:

- auth session state
- current user
- selected project filters

Use local component state where global state is unnecessary.

Avoid overengineering with Redux unless the project genuinely grows into it.

## Validation Plan

### Backend

- Bean Validation on DTOs
- centralized exception handling
- clear API response structure

### Frontend

- React Hook Form
- Zod schemas for auth and task/project forms
- visible input errors

## Response Format

Use consistent API wrapper format similar to earlier backend repos:

```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {},
  "timestamp": "2026-05-27T10:00:00"
}
```

## Testing Expectations

### Backend

- unit tests for core service logic
- integration tests for auth, project, and task endpoints

### Frontend

- at least basic component and form behavior tests later
- V1 can prioritize manual verification plus clean structure if time is limited

## Docker Strategy

Use:

- one backend service
- one PostgreSQL service
- optional frontend container later

For early development, running the frontend separately with Vite is fine.

## README Expectations

The final repository should include:

- Overview
- Tech Stack
- Features
- Screenshots
- Architecture
- Database Schema
- API Documentation
- Installation
- Environment Variables
- Docker Setup
- What I Learned
- Future Improvements

## Recommended Database Tables For V1

- `users`
- `roles`
- `projects`
- `project_members`
- `tasks`
- `refresh_tokens` if reused

## Recommended Development Order

### Phase 1

- scaffold backend
- configure PostgreSQL
- configure Docker Compose
- set up base package structure

### Phase 2

- implement auth flow
- implement user and role basics
- secure protected endpoints

### Phase 3

- implement project entity and CRUD
- implement project membership

### Phase 4

- implement task entity and CRUD
- implement task status and assignment logic

### Phase 5

- implement dashboard endpoints

### Phase 6

- scaffold frontend
- add routing, layout, and auth shell

### Phase 7

- connect project and task flows
- build dashboard and Kanban UI

### Phase 8

- polish README
- add screenshots
- add case study
- deploy if feasible

## First Implementation Slice

The first coding slice should be:

1. create `taskflow-fullstack/backend`
2. configure Spring Boot and PostgreSQL
3. add Docker Compose
4. implement auth package skeleton
5. create `User`, `Role`, `Project`, and `Task` entity shells
6. verify the backend starts cleanly

## Key Rule For This Project

Do not try to build everything at once.

TaskFlow becomes strong only if it is implemented as a sequence of clean, reviewable milestones.

It should feel like a serious product assembled intentionally, not a rushed feature pile.
