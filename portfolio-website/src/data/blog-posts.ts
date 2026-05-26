import type { BlogPost } from '../types/content'

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-rest-apis-with-spring-boot',
    title: 'Building REST APIs With Spring Boot',
    summary: 'Notes from structuring clean backend APIs with DTOs, validation, exception handling, and documentation.',
    publishedAt: '2026-05-26',
    readingTime: '6 min read',
    tags: ['Spring Boot', 'REST API', 'Backend'],
    content: [
      'A professional backend API is not just about CRUD endpoints. It is about predictable contracts, maintainable structure, and documentation that helps both teammates and recruiters understand the system quickly.',
      'In this portfolio ecosystem, I use focused backend projects to make Spring Boot knowledge explicit before integrating the same patterns into larger fullstack applications.',
    ],
  },
  {
    slug: 'how-i-use-ai-in-my-development-workflow',
    title: 'How I Use AI In My Development Workflow',
    summary: 'A practical look at using AI for planning, debugging, iteration, and documentation without turning it into a shortcut for understanding.',
    publishedAt: '2026-05-26',
    readingTime: '5 min read',
    tags: ['AI', 'Workflow', 'Productivity'],
    content: [
      'I use AI primarily to speed up iteration, compare architectural options, and reduce friction in repetitive tasks such as documentation and scaffolding.',
      'The important part is staying responsible: using AI to accelerate thinking, not to replace understanding or ownership.',
    ],
  },
  {
    slug: 'spring-security-and-jwt-notes',
    title: 'Spring Security And JWT Notes',
    summary: 'What I learned from separating authentication into its own proof project instead of hiding it inside a larger CRUD app.',
    publishedAt: '2026-05-26',
    readingTime: '5 min read',
    tags: ['Spring Security', 'JWT', 'Backend'],
    content: [
      'A dedicated authentication repository makes security decisions much easier to review. The tradeoff is worth it because recruiters and engineers can inspect the auth flow without first understanding a whole product domain.',
      'That separation also creates reusable patterns for future flagship projects. It is easier to trust auth inside a larger system when the underlying flow was already proven in isolation.',
    ],
  },
  {
    slug: 'where-python-fits-in-my-portfolio',
    title: 'Where Python Fits In My Portfolio',
    summary: 'How I want to use Python alongside Java and React for automation, developer tooling, and small backend experiments.',
    publishedAt: '2026-05-26',
    readingTime: '4 min read',
    tags: ['Python', 'Automation', 'Roadmap'],
    content: [
      'My main hiring story stays centered on Java, Spring Boot, React, and PostgreSQL. Python fits in as a complementary tool for automation, lightweight APIs, and data-oriented utilities that make the overall portfolio stronger.',
      'That means I do not want random Python side projects. I want focused repositories that show scripting, FastAPI exploration, and practical workflow tooling in a way that supports the larger fullstack ecosystem.',
    ],
  },
]
