export type ProjectResponse = {
  id: number
  name: string
  key: string
  description: string | null
  status: string
  ownerId: number
  ownerEmail: string
  createdAt: string
}

export type CreateProjectRequest = {
  name: string
  key: string
  description?: string
}

