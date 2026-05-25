-- Run this script after the application has started and seeded roles.
-- Demo password for all inserted users: Password1

INSERT INTO users (first_name, last_name, email, password, enabled, account_non_locked, created_at, updated_at)
VALUES
  ('Admin', 'User', 'admin@example.com', '$2a$10$7jcC9AfcBb5pBacbG3xNiOdfCU1yOXD9oRb/M3rZFKAqQoOXoSDlu', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Manager', 'User', 'manager@example.com', '$2a$10$7jcC9AfcBb5pBacbG3xNiOdfCU1yOXD9oRb/M3rZFKAqQoOXoSDlu', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Regular', 'User', 'user@example.com', '$2a$10$7jcC9AfcBb5pBacbG3xNiOdfCU1yOXD9oRb/M3rZFKAqQoOXoSDlu', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO UPDATE
SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  password = EXCLUDED.password,
  enabled = EXCLUDED.enabled,
  account_non_locked = EXCLUDED.account_non_locked,
  updated_at = CURRENT_TIMESTAMP;

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
