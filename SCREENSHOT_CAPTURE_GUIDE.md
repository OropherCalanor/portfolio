# Screenshot Capture Guide

This document defines the screenshot structure for the current portfolio projects.

The goal is simple:

- every project has a predictable `screenshots/` folder
- filenames stay stable for README usage
- the same filenames can later be reused inside `portfolio-website`

## Naming Rules

- use lowercase kebab-case
- prefer `.png`
- keep filenames stable once used in a README
- capture desktop first, then mobile where relevant
- avoid browser chrome when possible
- prefer clean seeded/demo data over empty screens

## Project Checklist

### portfolio-website

Folder:

- `portfolio-website/screenshots/`

Required files:

- `home-hero-desktop.png`
- `projects-archive-desktop.png`
- `taskflow-case-study-desktop.png`
- `home-mobile.png`
- `projects-mobile.png`

Optional files:

- `blog-desktop.png`
- `contact-section-desktop.png`
- `featured-projects-desktop.png`

### spring-employee-management-api

Folder:

- `spring-employee-management-api/screenshots/`

Required files:

- `swagger-overview.png`
- `employees-list-response.png`
- `departments-list-response.png`
- `positions-list-response.png`
- `employees-filtered-response.png`
- `docker-containers-running.png`

Optional files:

- `postman-collection.png`
- `validation-error-response.png`
- `standard-error-response.png`
- `pagination-example.png`

### spring-security-jwt-auth

Folder:

- `spring-security-jwt-auth/screenshots/`

Required files:

- `swagger-auth-overview.png`
- `register-success-response.png`
- `login-success-response.png`
- `refresh-token-response.png`
- `protected-endpoint-success.png`
- `admin-endpoint-success.png`

Optional files:

- `unauthorized-response.png`
- `role-based-endpoints.png`
- `docker-containers-running.png`

### python-automation-toolkit

Folder:

- `python-automation-toolkit/screenshots/`

Required files:

- `file-organizer-terminal.png`
- `readme-starter-terminal.png`
- `csv-cleaner-terminal.png`
- `file-organizer-before-after.png`
- `generated-readme-example.png`

Optional files:

- `csv-input-output-example.png`
- `tests-passing.png`
- `folder-structure.png`

### taskflow-fullstack

Folder:

- `taskflow-fullstack/screenshots/`

Required files:

- `login-page.png`
- `register-page.png`
- `dashboard-overview.png`
- `dashboard-analytics.png`
- `projects-list.png`
- `project-create-form.png`
- `board-overview.png`
- `board-task-create.png`
- `board-drag-drop.png`
- `board-member-management.png`
- `board-assignee-flow.png`
- `mobile-dashboard.png`

Optional files:

- `board-my-tasks-toggle.png`
- `board-filtered-view.png`
- `board-empty-state.png`
- `backend-swagger-overview.png`
- `local-run-workflow.png`

## Recommended Capture Order

1. `taskflow-fullstack`
2. `portfolio-website`
3. `spring-employee-management-api`
4. `spring-security-jwt-auth`
5. `python-automation-toolkit`

## Portfolio Reuse

The shared manifest for later portfolio usage lives in:

- `portfolio-website/src/data/project-screenshot-manifest.ts`

When screenshots are added, keep filenames exactly aligned with that manifest.
