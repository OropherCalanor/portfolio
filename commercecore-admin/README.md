# CommerceCore Admin

Business-oriented e-commerce admin panel for products, customers, orders, stock visibility, and dashboard metrics.

## Overview

`commercecore-admin` is the next flagship fullstack project in this portfolio ecosystem. It focuses on operational software rather than a customer storefront, showing how business workflows can be modeled through backend APIs and admin-focused frontend screens.

The current milestone includes a Spring Boot backend with service-layer modules, Swagger documentation, Dockerized PostgreSQL support, seeded demo data, and a React admin workspace that supports live product CRUD, category management, customer management, order creation, order status updates, and inventory deduction during fulfillment.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, Bean Validation
- Frontend: React, TypeScript, Vite, Recharts
- Database: PostgreSQL with H2 test profile
- Tooling: Maven Wrapper, npm, Docker Compose, Swagger/OpenAPI

## Current Features

- Product, category, customer, order, stock, and dashboard backend modules with service-layer business logic
- Product, category, and customer CRUD endpoints
- Order creation and status update endpoints with fulfillment stock deduction
- DTO-based category, product, customer, order, and stock movement responses
- Dashboard summary endpoint
- Stock movement listing and creation endpoints
- Product CSV export endpoint
- Order CSV export endpoint
- Customer CSV export endpoint
- Swagger/OpenAPI documentation
- Docker Compose setup with PostgreSQL
- Dev seed data for reviewer walkthroughs
- Product create, edit, and delete UI
- Product CSV export action
- Category create, edit, and delete UI
- Customer create, edit, and delete UI
- Customer CSV export action
- Order create and status update UI
- Order CSV export action
- Stock movement create UI with automatic product inventory refresh
- Frontend API client with live API mode, mutation refresh, and demo-data fallback

## API Surface

- `GET /api/v1/products`
- `GET /api/v1/products/export.csv`
- `POST /api/v1/products`
- `PUT /api/v1/products/{id}`
- `DELETE /api/v1/products/{id}`
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/{id}`
- `DELETE /api/v1/categories/{id}`
- `GET /api/v1/customers`
- `GET /api/v1/customers/export.csv`
- `POST /api/v1/customers`
- `PUT /api/v1/customers/{id}`
- `DELETE /api/v1/customers/{id}`
- `GET /api/v1/orders`
- `GET /api/v1/orders/export.csv`
- `POST /api/v1/orders`
- `PUT /api/v1/orders/{id}`
- `GET /api/v1/dashboard/summary`
- `GET /api/v1/stock/movements`
- `POST /api/v1/stock/movements`

## Project Structure

```text
commercecore-admin/
├── backend/
└── frontend/
```

## Backend

```bash
cd backend
./mvnw -q test
```

Run the backend locally against PostgreSQL:

```bash
cd ..
docker compose up --build
```

Useful local URLs:

- API base URL: `http://localhost:8090/api/v1`
- Swagger UI: `http://localhost:8090/swagger-ui.html`

Quick API checks:

```bash
curl -s http://127.0.0.1:8090/api/v1/dashboard/summary
curl -s http://127.0.0.1:8090/api/v1/products
```

## Frontend

```bash
cd frontend
npm install
npm run build
```

Run the frontend locally:

```bash
npm run dev
```

The frontend runs on `http://localhost:5175` and reads `VITE_API_BASE_URL` from `.env` when provided. If the backend is unavailable, the UI falls back to local demo data instead of breaking.

## Verification Status

- Backend test suite passes with H2 test profile.
- Product create/list/update/delete flow is covered by integration tests.
- Product CSV export is covered by an integration test.
- Category create/update/delete flow is covered by an integration test.
- Customer create/update/delete flow is covered by integration tests.
- Customer CSV export is covered by an integration test.
- Stock movement creation and negative-stock protection are covered by integration tests.
- Order fulfillment stock deduction and duplicate-deduction protection are covered by integration tests.
- Order CSV export is covered by an integration test.
- Docker Compose starts PostgreSQL and the Spring Boot backend successfully.
- Dev seed data loads into PostgreSQL on first startup.
- Swagger UI is reachable from the Dockerized backend.
- Frontend production build passes.
- Browser smoke test confirms the frontend switches from demo fallback to `Live API data` when the backend is running.

## Screenshot Checklist

Use [screenshots/README.md](./screenshots/README.md) when preparing portfolio images for this project.

## What This Project Proves

- business-oriented domain modeling
- admin dashboard thinking
- Spring Boot module organization
- React admin UI structure with API integration boundaries
- Dockerized local development
- tested fullstack CRUD workflow design
- portfolio growth beyond generic CRUD apps

## Future Improvements

- screenshots and portfolio case study
- authentication and admin roles
- richer dashboard analytics
- delivery/shipping workflow after order fulfillment
