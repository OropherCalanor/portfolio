import type { SkillGroup } from '../types/content'

export const skillGroups: SkillGroup[] = [
  {
    title: 'Backend',
    items: ['Java 21', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'JWT'],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Responsive UI'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'Relational modeling', 'SQL', 'Entity design'],
  },
  {
    title: 'DevOps And Tooling',
    items: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Swagger / OpenAPI', 'Postman'],
  },
  {
    title: 'Workflow',
    items: ['Layered architecture', 'Documentation-first development', 'Incremental delivery', 'Testing'],
  },
  {
    title: 'AI-Assisted Development',
    items: ['Prompt-driven iteration', 'AI-assisted planning', 'Developer workflow acceleration', 'Responsible AI usage'],
  },
]
