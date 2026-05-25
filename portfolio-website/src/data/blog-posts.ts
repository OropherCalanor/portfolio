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
]
