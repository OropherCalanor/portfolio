# Architecture Notes

## Current Direction

This project uses a layered architecture because it is the right balance of clarity and professionalism for a focused backend API.

Layers:

- `controller`
- `service`
- `repository`
- `dto`
- `mapper`
- `entity`
- `exception`

## Why This Fits The Project

- easy to explain in interviews
- easy for recruiters and reviewers to follow
- matches common Spring Boot team structures
- keeps business logic out of controllers
- keeps persistence concerns out of API models

## Planned Request Flow

Controller -> Service -> Repository -> Database

DTOs and mappers will sit between controllers, services, and entities to keep the API contract clean.

