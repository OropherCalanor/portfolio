INSERT INTO departments (name, description, created_at, updated_at)
VALUES
    ('Engineering', 'Backend and frontend engineering team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Product', 'Product strategy and planning team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Operations', 'Operations and internal support team', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;

INSERT INTO positions (title, description, created_at, updated_at)
VALUES
    ('Software Engineer', 'Builds product features and backend services', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Tech Lead', 'Leads architecture and delivery planning', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Product Manager', 'Coordinates product priorities and delivery', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (title) DO NOTHING;

INSERT INTO employees (first_name, last_name, email, phone_number, salary, hire_date, employment_status, department_id, position_id, created_at, updated_at)
SELECT
    'Ada',
    'Lovelace',
    'ada.lovelace@example.com',
    '+90-555-100-0001',
    95000.00,
    DATE '2024-01-15',
    'ACTIVE',
    d.id,
    p.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM departments d
JOIN positions p ON p.title = 'Software Engineer'
WHERE d.name = 'Engineering'
ON CONFLICT (email) DO NOTHING;

INSERT INTO employees (first_name, last_name, email, phone_number, salary, hire_date, employment_status, department_id, position_id, created_at, updated_at)
SELECT
    'Grace',
    'Hopper',
    'grace.hopper@example.com',
    '+90-555-100-0002',
    120000.00,
    DATE '2023-08-01',
    'ON_LEAVE',
    d.id,
    p.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM departments d
JOIN positions p ON p.title = 'Tech Lead'
WHERE d.name = 'Engineering'
ON CONFLICT (email) DO NOTHING;

INSERT INTO employees (first_name, last_name, email, phone_number, salary, hire_date, employment_status, department_id, position_id, created_at, updated_at)
SELECT
    'Katherine',
    'Johnson',
    'katherine.johnson@example.com',
    '+90-555-100-0003',
    88000.00,
    DATE '2024-03-10',
    'ACTIVE',
    d.id,
    p.id,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM departments d
JOIN positions p ON p.title = 'Product Manager'
WHERE d.name = 'Product'
ON CONFLICT (email) DO NOTHING;

