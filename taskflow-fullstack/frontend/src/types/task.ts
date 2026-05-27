export type TaskResponse = {
  id: number
  projectId: number
  title: string
  description: string | null
  status: string
  priority: string
  assigneeId: number | null
  assigneeEmail: string | null
  reporterId: number
  reporterEmail: string
  dueDate: string | null
  createdAt: string
}

export type CreateTaskRequest = {
  projectId: number
  title: string
  description?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  dueDate?: string
}

export type UpdateTaskStatusRequest = {
  status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED'
}

export type AssignTaskRequest = {
  assigneeUserId: number
}

