# CommerceCore Admin

Business-oriented e-commerce admin panel for products, customers, orders, stock visibility, and dashboard metrics.

## Overview

`commercecore-admin` is the next flagship fullstack project in this portfolio ecosystem. It focuses on operational software rather than a customer storefront, showing how business workflows can be modeled through backend APIs and admin-focused frontend screens.

The current milestone includes a Spring Boot backend with real domain modules, Swagger documentation, Dockerized PostgreSQL support, seeded demo data, and a React admin shell that can read from the live API with a demo-data fallback.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, Bean Validation
- Frontend: React, TypeScript, Vite, Recharts
- Database: PostgreSQL with H2 test profile
- Tooling: Maven Wrapper, npm, Docker Compose, Swagger/OpenAPI

## Current Features

- Product, category, customer, order, stock, and dashboard backend modules
- Product, category, and customer CRUD endpoints
- Basic order creation and status update endpoints
- DTO-based product, order, and stock movement responses
- Dashboard summary endpoint
- Stock movement listing endpoint
- Swagger/OpenAPI documentation
- Docker Compose setup with PostgreSQL
- Dev seed data for reviewer walkthroughs
- React admin UI shell with dashboard, product, customer, order, and stock sections
- Frontend API client with live API mode and demo-data fallback

## API Surface

- `GET /api/v1/products`
- `POST /api/v1/products`
- `PUT /api/v1/products/{id}`
- `DELETE /api/v1/products/{id}`
- `GET /api/v1/categories`
- `POST /api/v1/categories`
- `PUT /api/v1/categories/{id}`
- `DELETE /api/v1/categories/{id}`
- `GET /api/v1/customers`
- `POST /api/v1/customers`
- `PUT /api/v1/customers/{id}`
- `DELETE /api/v1/customers/{id}`
- `GET /api/v1/orders`
- `POST /api/v1/orders`
- `PUT /api/v1/orders/{id}`
- `GET /api/v1/dashboard/summary`
- `GET /api/v1/stock/movements`

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

## What This Project Proves

- business-oriented domain modeling
- admin dashboard thinking
- Spring Boot module organization
- React admin UI structure with API integration boundaries
- Dockerized local development
- portfolio growth beyond generic CRUD apps

## Future Improvements

- screenshots and portfolio case study
- authentication and admin roles
- deeper service-layer business logic
- CSV export and richer analytics
