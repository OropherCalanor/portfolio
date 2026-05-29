# CommerceCore Admin Blueprint

## Purpose

`commercecore-admin` is a business-focused fullstack portfolio project for managing e-commerce operations. It is an admin dashboard, not a customer storefront.

The goal is to prove that I can model operational business data, build admin workflows, and present useful dashboard information with a Java/Spring Boot backend and React frontend.

## V1 Scope

- Product management
- Category management
- Customer management
- Order management
- Stock movement visibility
- Dashboard summary

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Web, Spring Data JPA, Bean Validation
- Database: PostgreSQL-ready configuration with H2 test profile
- Frontend: React, TypeScript, Vite
- UI Direction: dense admin workspace, dark operational dashboard, table-first screens
- Deployment Readiness: Docker later, local build/test first

## Backend Modules

- `category`
- `product`
- `customer`
- `order`
- `stock`
- `dashboard`
- `common`

## V1 API Surface

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

## First Milestone

The first implementation slice should prove the architecture is real:

- backend context-load test
- one product controller integration test
- frontend production build
- README explaining purpose, stack, features, and current status

## Future Milestones

- add Docker Compose with PostgreSQL
- add charts with Recharts
- add seeded demo data
- add dashboard screenshots
- add portfolio case study content
