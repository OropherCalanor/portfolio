# Demo Data Notes

Use the SQL script in `scripts/demo-users.sql` after the application has started and the `roles` table has been seeded by the application.

Suggested demo accounts:

- `admin@example.com`
- `manager@example.com`
- `user@example.com`

For development and screenshots, the script inserts BCrypt-hashed passwords for:

- `Password1`

Recommended flow:

1. Start PostgreSQL and the application with Docker Compose.
2. Run the SQL script against the database.
3. Use the demo accounts to test role-based endpoints in Swagger or Postman.

