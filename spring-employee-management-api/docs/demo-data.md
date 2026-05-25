# Demo Data Guide

## Purpose

Use this script to populate the API with realistic sample records for:

- Swagger screenshots
- Postman walkthroughs
- portfolio README visuals
- recruiter demo sessions

## Start the application

```bash
docker compose up --build
```

## Load the demo data

In a second terminal:

```bash
docker compose exec postgres psql -U postgres -d employee_management_db -f /app/scripts/demo-data.sql
```

If you are using custom database credentials from `.env`, replace the username and database name accordingly.

## Included sample records

- 3 departments
- 3 positions
- 3 employees

## Useful demo endpoints

- `GET /api/v1/departments`
- `GET /api/v1/positions`
- `GET /api/v1/employees`
- `GET /api/v1/employees?status=ACTIVE`
- `GET /api/v1/employees?sortBy=lastName&sortDir=asc`

