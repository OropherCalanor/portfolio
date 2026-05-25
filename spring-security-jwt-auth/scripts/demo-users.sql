-- Run this script after the application has started and seeded roles.
-- Demo password for all inserted users: Password1

INSERT INTO users (first_name, last_name, email, password, enabled, account_non_locked, created_at, updated_at)
VALUES
  ('Admin', 'User', 'admin@example.com', '$2a$10$1D9m0t9Q8oY6v3g8n2w9UuW2nC0r6q3QnQ6n4mQnyfW4wAh4dS2gW', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Manager', 'User', 'manager@example.com', '$2a$10$1D9m0t9Q8oY6v3g8n2w9UuW2nC0r6q3QnQ6n4mQnyfW4wAh4dS2gW', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Regular', 'User', 'user@example.com', '$2a$10$1D9m0t9Q8oY6v3g8n2w9UuW2nC0r6q3QnQ6n4mQnyfW4wAh4dS2gW', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ROLE_ADMIN'
WHERE u.email = 'admin@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ROLE_MANAGER'
WHERE u.email = 'manager@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ROLE_USER'
WHERE u.email = 'user@example.com'
ON CONFLICT DO NOTHING;
