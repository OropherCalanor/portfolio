# Project Blueprint: spring-security-jwt-auth

## Goal

Build a focused Spring Boot authentication and authorization API that demonstrates practical Spring Security knowledge, JWT-based authentication, refresh token flow, role-based access control, secure password handling, and professional backend project structure.

## Portfolio Purpose

This project should be your dedicated security proof project. Its job is to show recruiters that you understand authentication and authorization architecture separately from generic CRUD work.

It should feel like a clean auth foundation that could later be reused in larger systems such as:

- `taskflow-fullstack`
- `commercecore-admin`
- `ai-job-application-tracker`

## What This Project Must Prove

- Spring Security fundamentals
- JWT access token generation and validation
- refresh token flow
- secure password hashing
- role-based authorization
- protected endpoint design
- current user retrieval
- logout strategy
- PostgreSQL integration
- Swagger documentation for auth flows
- Dockerized local setup

## Recommended Stack

- Java 21
- Spring Boot
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- Bean Validation
- Lombok
- MapStruct or manual mapping
- JJWT or Auth0 JWT library
- Springdoc OpenAPI
- Docker
- Docker Compose

## Scope

Keep this project narrowly focused on identity and access management.

Do not turn it into a user profile system or a full business application.

## Core Features

- register
- login
- JWT access token creation
- refresh token creation
- refresh token endpoint
- logout
- password hashing with BCrypt
- role-based authorization
- protected endpoints
- admin-only endpoint
- manager-only or manager/admin endpoint
- user-accessible endpoint
- current authenticated user endpoint

## Roles

Use three roles:

- `ADMIN`
- `MANAGER`
- `USER`

## Recommended Domain Model

### User

Fields:

- `id`
- `firstName`
- `lastName`
- `email`
- `password`
- `enabled`
- `accountNonLocked`
- `createdAt`
- `updatedAt`
- `roles`

### Role

Fields:

- `id`
- `name`

### RefreshToken

Fields:

- `id`
- `token`
- `expiryDate`
- `revoked`
- `user`
- `createdAt`

## Relationships

- one user can have many roles
- one role can belong to many users
- one user can have multiple refresh tokens if you want session flexibility

### Recommended relationship setup

- `User` many-to-many `Role`
- `RefreshToken` many-to-one `User`

## Recommended Enums

### RoleName

- `ROLE_ADMIN`
- `ROLE_MANAGER`
- `ROLE_USER`

Using the `ROLE_` prefix works well with Spring Security conventions.

## Security Flow

### Register flow

1. user submits registration data
2. system validates request
3. system checks unique email
4. password is hashed with BCrypt
5. default role is assigned
6. user is saved
7. response returns user-safe data

### Login flow

1. user submits email and password
2. Spring Security authenticates credentials
3. access token is generated
4. refresh token is generated and stored
5. response returns tokens and user info

### Refresh flow

1. client sends refresh token
2. system verifies token exists, is not revoked, and is not expired
3. new access token is generated
4. optionally rotate refresh token

### Logout flow

1. client sends refresh token or authenticated request
2. system revokes the refresh token
3. response confirms logout

## API Feature List

### Public endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`

### Protected endpoints

- `POST /api/v1/auth/logout`
- `GET /api/v1/users/me`
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/manager/reports`
- `GET /api/v1/user/profile`

## Recommended Request/Response DTOs

### Auth request DTOs

- `RegisterRequest`
- `LoginRequest`
- `RefreshTokenRequest`
- `LogoutRequest`

### Auth response DTOs

- `AuthResponse`
- `UserResponse`
- `TokenRefreshResponse`

### Shared DTOs

- `ApiResponse<T>`
- `ErrorResponse`

## Example AuthResponse

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt-access-token",
    "refreshToken": "refresh-token",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "user": {
      "id": 1,
      "email": "user@example.com",
      "roles": ["ROLE_USER"]
    }
  },
  "timestamp": "2026-05-26T10:00:00"
}
```

## Validation Rules

### Register validation

- `firstName`: not blank
- `lastName`: not blank
- `email`: valid and unique
- `password`: minimum length, strong password rule preferred

### Login validation

- `email`: not blank
- `password`: not blank

### Refresh token validation

- token must not be blank
- token must exist
- token must not be expired
- token must not be revoked

## Recommended Package Structure

```text
src/main/java/com/ruhatkaratas/authapi
├── config
├── controller
├── dto
│   ├── auth
│   ├── common
│   └── user
├── entity
├── exception
├── mapper
├── repository
├── security
│   ├── jwt
│   ├── service
│   └── filter
├── service
├── service/impl
└── AuthApiApplication.java
```

## Security Package Plan

### `security.jwt`

- `JwtService`
- `JwtProperties`

### `security.service`

- `CustomUserDetailsService`

### `security.filter`

- `JwtAuthenticationFilter`

### `config`

- `SecurityConfig`
- `OpenApiConfig`

## Repository Plan

- `UserRepository`
- `RoleRepository`
- `RefreshTokenRepository`

### Suggested repository capabilities

- find user by email
- exists user by email
- find role by name
- find refresh token by token
- delete or revoke refresh tokens by user

## Service Plan

### Services

- `AuthService`
- `RefreshTokenService`
- `UserService`

### Responsibilities

#### AuthService

- register user
- login user
- refresh access token
- logout user

#### RefreshTokenService

- create refresh token
- validate refresh token
- revoke refresh token
- revoke all tokens for user if needed

#### UserService

- return current authenticated user

## Controller Plan

### Auth controller

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

### User controller

- `GET /api/v1/users/me`

### Demo protected controllers

- `GET /api/v1/admin/dashboard`
- `GET /api/v1/manager/reports`
- `GET /api/v1/user/profile`

These endpoints are intentionally simple. Their purpose is to prove authorization rules clearly in Swagger and Postman.

## Authentication Design Direction

### Recommended token strategy

- short-lived access token
- longer-lived refresh token stored in database
- revoke refresh token on logout

### Suggested durations

- access token: 15 minutes
- refresh token: 7 days

These values are good enough for demonstration and easy to explain in interviews.

## Password Security Direction

- use BCryptPasswordEncoder
- never return password in any response
- never log raw passwords

## Exception Handling Direction

Create specific exceptions for:

- invalid credentials
- duplicate email
- resource not found
- invalid token
- expired token
- unauthorized access

## Swagger / OpenAPI Direction

Document:

- register request
- login request
- refresh request
- bearer authentication usage
- protected endpoint requirements
- role restrictions for demo endpoints

### Target URLs

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI docs: `http://localhost:8080/v3/api-docs`

## PostgreSQL Plan

### Suggested local database settings

- database: `jwt_auth_db`
- username: `postgres`
- password: `postgres`
- port: `5432`

### Environment variables

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_ACCESS_EXPIRATION`
- `JWT_REFRESH_EXPIRATION`
- `SPRING_PROFILES_ACTIVE`

## Docker Plan

Use Docker Compose for:

- Spring Boot application
- PostgreSQL database

### Expected services

- `app`
- `postgres`

## Demo Data Direction

Seed:

- default roles
- one admin user
- one manager user
- one standard user

### Example users

- `admin@example.com`
- `manager@example.com`
- `user@example.com`

This makes Swagger and Postman demos much easier.

## Testing Direction

Minimum recommended tests:

- auth service unit tests
- login success/failure tests
- refresh token validation tests
- protected endpoint integration tests
- role-based access integration tests

## Documentation Deliverables

This repository should include:

- `README.md`
- `.env.example`
- `docker-compose.yml`
- `docs/architecture.md`
- `docs/security-flow.md`
- `docs/database-schema.md`
- `postman/spring-security-jwt-auth.postman_collection.json`
- `screenshots/swagger-auth-overview.png`

## Milestone Plan

### Milestone 1: project scaffolding

- initialize project
- configure dependencies
- configure PostgreSQL
- configure environment variables

### Milestone 2: domain and persistence

- create `User`, `Role`, and `RefreshToken`
- create repositories
- seed default roles

### Milestone 3: security core

- implement `CustomUserDetailsService`
- implement JWT utilities
- implement authentication filter
- implement Spring Security configuration

### Milestone 4: auth API

- implement register
- implement login
- implement refresh
- implement logout
- implement current user endpoint

### Milestone 5: authorization proof

- add protected endpoints
- add admin/manager/user route protection
- add Swagger security configuration

### Milestone 6: quality and packaging

- add tests
- add Docker support
- add Postman collection
- finalize README

## Recommended First Implementation Slice

When we start coding, the first slice should be:

1. scaffold the Spring Boot project
2. configure PostgreSQL and environment variables
3. create `User`, `Role`, and `RefreshToken` entities
4. create repositories
5. add basic role seed data

Then we build the security layer on top of a clean persistence base.

## Success Criteria

This project is ready for recruiter review when:

- register and login work correctly
- JWT access token works on protected endpoints
- refresh token flow works
- logout revokes refresh token
- role-based authorization is clearly demonstrated
- Swagger documents the auth flow
- Docker setup works
- README explains the architecture clearly
- tests prove critical flows
