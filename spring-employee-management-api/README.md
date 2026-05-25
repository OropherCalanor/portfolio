# Spring Employee Management API

Professional Spring Boot REST API for employee, department, and position management built to demonstrate clean backend architecture, PostgreSQL integration, validation, documentation, and Dockerized local setup.

## Overview

This project is the first backend foundation project in the portfolio ecosystem. It is intentionally focused on doing core Spring Boot API work well: clean entity modeling, layered architecture, PostgreSQL integration, structured validation, consistent error handling, and professional project documentation.

The goal is to present a recruiter-friendly backend repository that proves production-style API fundamentals rather than tutorial-level CRUD.

## Tech Stack

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Bean Validation
- Lombok
- MapStruct
- Springdoc OpenAPI
- Docker
- Docker Compose

## Features

- Employee CRUD foundation
- Department CRUD foundation
- Position CRUD foundation
- PostgreSQL-ready JPA entity model
- Base entity auditing timestamps
- Repository layer scaffold
- Dockerized local development setup
- Swagger/OpenAPI dependency setup
- Postman collection for manual endpoint verification

## Architecture

This project follows a layered architecture and starts with a strong persistence foundation:

- `entity` for JPA models
- `repository` for database access
- `dto` for request and response models
- `service` for business logic
- `controller` for HTTP endpoints
- `exception` for global error handling
- `config` for application configuration

The current scaffold includes the project structure, domain model, environment setup, and repository layer so the next implementation step can focus on DTOs, services, and controllers.

## Database Schema

Core entities:

- `Employee`
- `Department`
- `Position`

Relationships:

- one department has many employees
- one position can be assigned to many employees
- one employee belongs to one department
- one employee has one position

See [docs/database-schema.md](./docs/database-schema.md) for the initial schema direction.

## API Documentation

Planned URLs after the application is running:

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`
- Postman Collection: `./postman/spring-employee-management-api.postman_collection.json`

## Installation

### Prerequisites

- Java 21
- Maven 3.9+ or Maven Wrapper
- Docker and Docker Compose

### Clone the repository

```bash
git clone <repository-url>
cd spring-employee-management-api
```

### Configure environment variables

```bash
cp .env.example .env
```

### Run locally

```bash
./mvnw spring-boot:run
```

If you prefer a local Maven installation instead of the wrapper:

```bash
mvn spring-boot:run
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `employee_management_db` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |
| `SPRING_PROFILES_ACTIVE` | Active Spring profile | `dev` |

## Docker Setup

Run the application and PostgreSQL together:

```bash
docker compose up --build
```

Stop the stack when you are done:

```bash
docker compose down
```

Load demo data for screenshots and walkthroughs:

```bash
docker compose exec postgres psql -U postgres -d employee_management_db -f /app/scripts/demo-data.sql
```

See [docs/demo-data.md](./docs/demo-data.md) for the full walkthrough.

## Testing

Run the test suite with the Maven Wrapper:

```bash
./mvnw test
```

## What I Learned

This repository is being built as a portfolio-quality backend foundation project, with emphasis on structure, maintainability, and recruiter-friendly documentation.

## Future Improvements

- Add DTOs and mappers
- Add services and controllers
- Add pagination, sorting, and filtering
- Add global exception handling
- Add integration tests
- Add Postman collection

## Author

- Name: Ruhat Karatas
