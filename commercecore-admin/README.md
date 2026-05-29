# CommerceCore Admin

Business-oriented e-commerce admin panel for products, customers, orders, stock visibility, and dashboard metrics.

## Overview

`commercecore-admin` is the next flagship fullstack project in this portfolio ecosystem. It focuses on operational software rather than a customer storefront, showing how business workflows can be modeled through backend APIs and admin-focused frontend screens.

The first milestone includes a Spring Boot backend scaffold with real domain modules and a React admin shell that presents the intended dashboard, product, customer, order, and stock views.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Data JPA, Bean Validation
- Frontend: React, TypeScript, Vite
- Database: PostgreSQL-ready configuration with H2 test profile
- Tooling: Maven Wrapper, npm

## Current Features

- Product, category, customer, order, stock, and dashboard backend modules
- Product, category, and customer CRUD endpoints
- Basic order creation and status update endpoints
- DTO-based product, order, and stock movement responses
- Dashboard summary endpoint
- Stock movement listing endpoint
- React admin UI shell with dashboard, product, customer, order, and stock sections

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

## Frontend

```bash
cd frontend
npm install
npm run build
```

The current frontend milestone is a static admin shell. Backend integration will be added after the first API endpoints and demo data are stable.

## What This Project Proves

- business-oriented domain modeling
- admin dashboard thinking
- Spring Boot module organization
- React admin UI structure
- portfolio growth beyond generic CRUD apps

## Future Improvements

- Docker Compose with PostgreSQL
- Recharts dashboard analytics
- seeded demo data
- screenshots and portfolio case study
- authentication and admin roles
