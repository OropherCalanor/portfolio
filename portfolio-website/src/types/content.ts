export type ProjectCategory = 'backend' | 'fullstack' | 'frontend' | 'ai' | 'devops' | 'tools'
export type ProjectStatus = 'planned' | 'in-progress' | 'completed'
export type ProjectTier = 'flagship' | 'proof' | 'mini'

export type ProjectScreenshot = {
  src: string
  alt: string
  caption?: string
}

export type Project = {
  slug: string
  name: string
  summary: string
  description: string
  stack: string[]
  category: ProjectCategory
  tier: ProjectTier
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
  verification?: string[]
  repositoryHighlights?: string[]
  nextMilestones?: string[]
  buildFocus?: string
  screenshots?: ProjectScreenshot[]
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
