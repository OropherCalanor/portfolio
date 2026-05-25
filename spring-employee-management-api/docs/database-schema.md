# Database Schema Notes

## Core Entities

### Department

- `id`
- `name`
- `description`
- `created_at`
- `updated_at`

### Position

- `id`
- `title`
- `description`
- `created_at`
- `updated_at`

### Employee

- `id`
- `first_name`
- `last_name`
- `email`
- `phone_number`
- `salary`
- `hire_date`
- `employment_status`
- `department_id`
- `position_id`
- `created_at`
- `updated_at`

## Relationships

- one department has many employees
- one position has many employees
- one employee belongs to one department
- one employee has one position

## Initial Constraints

- unique `department.name`
- unique `position.title`
- unique `employee.email`
- non-negative `employee.salary`
- `employee.hire_date` should not be in the future

