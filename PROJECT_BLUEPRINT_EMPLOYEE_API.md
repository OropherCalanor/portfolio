# Project Blueprint: spring-employee-management-api

## Goal

Build a professional Spring Boot REST API that demonstrates strong backend fundamentals, clean structure, PostgreSQL integration, validation, documentation, and Dockerized local setup.

## Portfolio Purpose

This should be your first strong backend proof project. It is meant to show recruiters that you can build a clean, production-style API with real structure instead of a tutorial-level CRUD demo.

## What This Project Must Prove

- Java 17 or 21 proficiency
- Spring Boot fundamentals
- REST API design
- layered architecture
- DTO and mapper separation
- PostgreSQL integration
- validation and exception handling
- pagination, sorting, and filtering
- Swagger/OpenAPI documentation
- Docker and Docker Compose setup

## Recommended Stack

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

## Scope

Keep this project focused and polished. Do not add authentication here. Authentication belongs in `spring-security-jwt-auth`.

### Core entities

- `Employee`
- `Department`
- `Position`

### Core business rules

- each employee belongs to one department
- each employee has one position
- department can have many employees
- position can be assigned to many employees
- employee email must be unique
- employee salary cannot be negative
- employee hire date cannot be in the future
- department name should be unique
- position title should be unique

## Recommended Domain Model

### Employee

Fields:

- `id`
- `firstName`
- `lastName`
- `email`
- `phoneNumber`
- `salary`
- `hireDate`
- `employmentStatus`
- `department`
- `position`
- `createdAt`
- `updatedAt`

### Department

Fields:

- `id`
- `name`
- `description`
- `createdAt`
- `updatedAt`

### Position

Fields:

- `id`
- `title`
- `description`
- `createdAt`
- `updatedAt`

### Suggested enum

`EmploymentStatus`

- `ACTIVE`
- `ON_LEAVE`
- `TERMINATED`

## Database Relationships

- `department` 1 -> many `employees`
- `position` 1 -> many `employees`

### Schema notes

- unique constraint on `employee.email`
- unique constraint on `department.name`
- unique constraint on `position.title`
- indexes on `employee.last_name`, `employee.email`, and `employee.employment_status`

## API Feature List

### Employee features

- create employee
- get employee by id
- get all employees
- update employee
- delete employee
- paginate employees
- sort employees
- filter by department
- filter by position
- filter by employment status
- search by name or email

### Department features

- create department
- get department by id
- get all departments
- update department
- delete department

### Position features

- create position
- get position by id
- get all positions
- update position
- delete position

## Standard API Response Direction

Use a consistent response structure for successful responses where it adds clarity.

### Example response wrapper

```json
{
  "success": true,
  "message": "Employee fetched successfully",
  "data": {
    "id": 1
  },
  "timestamp": "2026-05-25T22:00:00"
}
```

For paginated results, use a dedicated paginated response structure instead of forcing everything into the same shape.

## Error Handling Direction

Create global exception handling with:

- resource not found exception
- duplicate resource exception
- validation exception handling
- bad request exception
- generic fallback exception

### Error response example

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "must be a valid email"
  },
  "timestamp": "2026-05-25T22:00:00"
}
```

## Recommended Package Structure

```text
src/main/java/com/ruhatkaratas/employeemanagement
├── config
├── controller
├── dto
│   ├── department
│   ├── employee
│   └── position
├── entity
├── exception
├── mapper
├── repository
├── service
├── service/impl
├── specification
└── EmployeeManagementApplication.java
```

## DTO Plan

Separate request and response DTOs for clarity.

### Employee DTOs

- `EmployeeCreateRequest`
- `EmployeeUpdateRequest`
- `EmployeeResponse`
- `EmployeeSummaryResponse`

### Department DTOs

- `DepartmentCreateRequest`
- `DepartmentUpdateRequest`
- `DepartmentResponse`

### Position DTOs

- `PositionCreateRequest`
- `PositionUpdateRequest`
- `PositionResponse`

### Shared DTOs

- `ApiResponse<T>`
- `PagedResponse<T>`

## Mapper Plan

Use MapStruct if you want stronger mapper separation and cleaner service logic.

### Suggested mappers

- `EmployeeMapper`
- `DepartmentMapper`
- `PositionMapper`

If you prefer less setup for the first project, manual mapping is acceptable, but MapStruct is a strong portfolio signal when kept simple.

## Repository Plan

### Repositories

- `EmployeeRepository`
- `DepartmentRepository`
- `PositionRepository`

### Suggested repository capabilities

- exists by unique fields
- search with pagination
- filtering via `JpaSpecificationExecutor` for employees

## Service Plan

### Service interfaces

- `EmployeeService`
- `DepartmentService`
- `PositionService`

### Service responsibilities

- validate business rules
- coordinate repository access
- map entities and DTOs
- throw domain-specific exceptions

## Controller Plan

### Base routes

- `/api/v1/employees`
- `/api/v1/departments`
- `/api/v1/positions`

### Suggested employee endpoints

- `POST /api/v1/employees`
- `GET /api/v1/employees`
- `GET /api/v1/employees/{id}`
- `PUT /api/v1/employees/{id}`
- `DELETE /api/v1/employees/{id}`

### Suggested query parameters for employee listing

- `page`
- `size`
- `sortBy`
- `sortDir`
- `departmentId`
- `positionId`
- `status`
- `search`

## Validation Plan

Use Jakarta Bean Validation on request DTOs.

### Example validation rules

- `firstName`: not blank, max length
- `lastName`: not blank, max length
- `email`: valid format, not blank
- `salary`: positive or zero
- `hireDate`: past or present
- `departmentId`: not null
- `positionId`: not null

## Swagger / OpenAPI Plan

Document:

- endpoint summaries
- request/response models
- validation error cases
- pagination parameters

### Target URLs

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI docs: `http://localhost:8080/v3/api-docs`

## PostgreSQL Plan

### Suggested local database settings

- database: `employee_management_db`
- username: `postgres`
- password: `postgres`
- port: `5432`

### Environment variables

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `SPRING_PROFILES_ACTIVE`

## Docker Plan

Use Docker Compose for:

- Spring Boot application
- PostgreSQL database

### Expected services

- `app`
- `postgres`

### Expected benefits

- easy reviewer setup
- reproducible local environment
- stronger GitHub presentation

## Testing Direction

Minimum recommended test scope for this project:

- service-level unit tests for business rules
- controller integration tests for critical endpoints
- repository test if custom filtering becomes non-trivial

If time is limited, prioritize:

1. validation and duplicate checks
2. employee creation and retrieval flow
3. filtering/pagination behavior

## Documentation Deliverables

This repository should include:

- `README.md`
- `.env.example`
- `docker-compose.yml`
- `docs/architecture.md`
- `docs/database-schema.md`
- `postman/spring-employee-management-api.postman_collection.json`
- `screenshots/swagger-overview.png`

## Milestone Plan

### Milestone 1: project scaffolding

- initialize Spring Boot project
- configure dependencies
- configure profiles and environment variables
- set up PostgreSQL connection

### Milestone 2: domain and persistence

- create entities
- create repositories
- define relationships and constraints

### Milestone 3: business and API layer

- create DTOs
- add mappers
- implement services
- implement controllers

### Milestone 4: quality and docs

- add validation
- add global exception handling
- add Swagger
- prepare Postman collection

### Milestone 5: packaging

- add Dockerfile
- add Docker Compose
- finalize README
- capture screenshots

## Recommended First Implementation Slice

When we begin coding, the first slice should be:

1. scaffold the Spring Boot project
2. configure PostgreSQL and application properties
3. create `Department`, `Position`, and `Employee` entities
4. create repositories
5. verify the application starts cleanly

This gives us a stable base before adding DTOs and controllers.

## Success Criteria

This project is ready for recruiter review when:

- the API runs locally without friction
- CRUD endpoints work correctly
- validation and error responses are clean
- PostgreSQL is integrated properly
- Swagger docs are available
- Docker Compose works
- README is complete
- screenshots are included
- the code structure is clean and easy to understand
