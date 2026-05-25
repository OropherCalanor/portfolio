import type { Project } from '../types/content'

export const projects: Project[] = [
  {
    slug: 'spring-employee-management-api',
    name: 'Spring Employee Management API',
    summary: 'A clean Spring Boot REST API that proves backend fundamentals with PostgreSQL, Swagger, and Docker.',
    description:
      'This project demonstrates production-style API structure with layered architecture, DTO-driven contracts, validation, exception handling, filtering, and documentation.',
    stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Swagger', 'Docker'],
    category: 'backend',
    githubUrl: 'https://github.com/OropherCalanor/portfolio/tree/main/spring-employee-management-api',
    featured: true,
    status: 'completed',
    whatItProves: [
      'REST API design',
      'JPA and PostgreSQL usage',
      'Validation and exception handling',
      'Dockerized backend setup',
    ],
    problem: 'I needed a focused backend project that shows I can build a professional API without hiding behind a fullstack UI.',
    solution:
      'I built an employee management API with clean resource structure, pagination, sorting, filtering, DTO-based responses, OpenAPI docs, and test coverage.',
    keyFeatures: [
      'Employee, department, and position CRUD',
      'Pagination, sorting, and filtering',
      'Global exception handling',
      'Swagger/OpenAPI integration',
      'Docker Compose setup',
    ],
    architecture: [
      'Layered architecture with controller, service, repository, mapper, DTO, and exception layers',
      'Shared API response models for predictable client integration',
      'Validation at request boundary with centralized error handling',
    ],
    databaseDesign: [
      'Relational structure around employee, department, and position entities',
      'Foreign key relationships to keep employee records normalized',
      'PostgreSQL as the primary persistence layer',
    ],
    learned: [
      'How to keep a backend project simple while still making it look production-ready',
      'How to design consistent API response structures',
      'How to document and test a recruiter-facing backend repo',
    ],
    futureImprovements: [
      'Add CI with GitHub Actions',
      'Add richer integration testing',
      'Add audit fields for business events',
    ],
  },
  {
    slug: 'spring-security-jwt-auth',
    name: 'Spring Security JWT Auth API',
    summary: 'A focused authentication API with JWT, refresh tokens, role-based access control, and protected endpoints.',
    description:
      'This project isolates identity and access concerns into a dedicated backend service so the security architecture is easy to understand and reuse in future fullstack products.',
    stack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'PostgreSQL', 'Docker'],
    category: 'backend',
    githubUrl: 'https://github.com/OropherCalanor/portfolio/tree/main/spring-security-jwt-auth',
    featured: true,
    status: 'completed',
    whatItProves: [
      'Spring Security configuration',
      'JWT authentication flow',
      'Refresh token persistence',
      'Role-based authorization',
    ],
    problem: 'I wanted a dedicated project that proves security knowledge clearly instead of burying auth inside a larger CRUD application.',
    solution:
      'I created a small but complete auth API with register, login, refresh, logout, seeded roles, protected routes, and integration tests.',
    keyFeatures: [
      'Register and login flow',
      'JWT access token generation',
      'Refresh token issuance and revocation',
      'Role-based protected endpoints',
      'Swagger documentation and Docker support',
    ],
    architecture: [
      'Layered backend plus dedicated security package',
      'JWT filter and custom user details integration',
      'Refresh token persistence for logout and session continuity',
    ],
    databaseDesign: [
      'Users, roles, and refresh tokens modeled relationally',
      'Many-to-many user-role relationship',
      'Dedicated refresh token table for revocation and renewal',
    ],
    learned: [
      'How Spring Security authentication flows connect to application-level token management',
      'How to handle invalid credentials cleanly instead of leaking generic errors',
      'How to seed and test auth data reliably',
    ],
    futureImprovements: [
      'Add password reset flow',
      'Add email verification',
      'Add refresh token rotation',
    ],
  },
  {
    slug: 'taskflow-fullstack',
    name: 'TaskFlow Fullstack',
    summary: 'A flagship project management app with dashboard, Kanban flow, and secure fullstack architecture.',
    description:
      'TaskFlow is planned as the main fullstack proof project in this portfolio ecosystem, combining secure backend design with a polished React frontend.',
    stack: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    category: 'fullstack',
    githubUrl: 'https://github.com/OropherCalanor',
    featured: true,
    status: 'planned',
    whatItProves: [
      'End-to-end fullstack architecture',
      'Frontend-backend integration',
      'Dashboard and Kanban UX',
      'Role-aware product design',
    ],
    problem: 'I want one flagship app that shows I can build a serious product, not just small isolated demos.',
    solution:
      'The planned solution is a fullstack task and project management platform with auth, task lifecycle management, dashboards, and collaborative structure.',
    keyFeatures: [
      'Project and task management',
      'Kanban board',
      'Dashboard analytics',
      'JWT-based auth',
      'Filtering and search',
    ],
    architecture: [
      'Feature-based backend modules',
      'React frontend organized by routes, features, and shared UI',
      'Clear boundary between auth, project, task, and dashboard concerns',
    ],
    databaseDesign: [
      'Users, projects, tasks, memberships, and statuses modeled relationally',
      'Task prioritization and deadlines stored for dashboard visibility',
    ],
    learned: [],
    futureImprovements: [
      'Implementation coming next',
    ],
  },
  {
    slug: 'commercecore-admin',
    name: 'CommerceCore Admin',
    summary: 'A business-oriented admin panel for products, orders, customers, and stock visibility.',
    description:
      'This planned project is designed to show business software thinking through dashboards, stock logic, and operational workflows.',
    stack: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Recharts'],
    category: 'fullstack',
    githubUrl: 'https://github.com/OropherCalanor',
    featured: false,
    status: 'planned',
    whatItProves: [
      'Admin dashboard design',
      'Business-oriented data modeling',
      'Analytics and reporting',
    ],
    problem: 'I want to show that I can build software for real business operations, not just developer demos.',
    solution: 'The project is planned as an e-commerce operations panel with inventory, order, and customer management.',
    keyFeatures: ['Product management', 'Order tracking', 'Low stock visibility', 'Sales charts'],
    architecture: ['Planned fullstack admin architecture'],
    databaseDesign: ['Planned product, order, stock, and customer schema'],
    learned: [],
    futureImprovements: ['Implementation planned after TaskFlow'],
  },
  {
    slug: 'ai-job-application-tracker',
    name: 'AI Job Application Tracker',
    summary: 'An AI-assisted productivity app for managing job applications and extracting insights from job descriptions.',
    description:
      'This project is planned to connect practical fullstack development with useful AI-assisted workflows such as skill extraction and cover letter drafting.',
    stack: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'AI API'],
    category: 'ai',
    githubUrl: 'https://github.com/OropherCalanor',
    featured: false,
    status: 'planned',
    whatItProves: [
      'AI API integration',
      'Product thinking',
      'Structured prompt usage in applications',
    ],
    problem: 'I want a project that shows modern AI usage in a practical product, not a gimmick.',
    solution:
      'The planned solution is an application tracker that stores applications and uses AI to extract skills, identify gaps, and help draft materials.',
    keyFeatures: ['Application tracking', 'Skill extraction', 'Gap analysis', 'Cover letter drafting'],
    architecture: ['Planned fullstack architecture with AI orchestration layer'],
    databaseDesign: ['Planned job application, company, and status tracking schema'],
    learned: [],
    futureImprovements: ['Implementation planned after CommerceCore'],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
