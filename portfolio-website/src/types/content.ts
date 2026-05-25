export type ProjectCategory = 'backend' | 'fullstack' | 'frontend' | 'ai'
export type ProjectStatus = 'planned' | 'in-progress' | 'completed'

export type Project = {
  slug: string
  name: string
  summary: string
  description: string
  stack: string[]
  category: ProjectCategory
  githubUrl: string
  liveUrl?: string
  featured: boolean
  status: ProjectStatus
  whatItProves: string[]
  problem: string
  solution: string
  keyFeatures: string[]
  architecture: string[]
  databaseDesign: string[]
  learned: string[]
  futureImprovements: string[]
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type BlogPost = {
  slug: string
  title: string
  summary: string
  publishedAt: string
  readingTime: string
  tags: string[]
  content: string[]
}
