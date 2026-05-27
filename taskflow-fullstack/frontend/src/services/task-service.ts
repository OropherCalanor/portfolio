import { apiRequest } from '../lib/api-client'
import type {
  AssignTaskRequest,
  CreateTaskRequest,
  TaskResponse,
  UpdateTaskStatusRequest,
} from '../types/task'

export const taskService = {
  async getTasksByProject(projectId: number): Promise<TaskResponse[]> {
    return apiRequest<TaskResponse[]>(`/api/v1/tasks?projectId=${projectId}`, {
      method: 'GET',
      authenticated: true,
    })
  },

  async createTask(payload: CreateTaskRequest): Promise<TaskResponse> {
    return apiRequest<TaskResponse>('/api/v1/tasks', {
      method: 'POST',
      authenticated: true,
      body: JSON.stringify(payload),
    })
  },

  async updateTaskStatus(taskId: number, payload: UpdateTaskStatusRequest): Promise<TaskResponse> {
    return apiRequest<TaskResponse>(`/api/v1/tasks/${taskId}/status`, {
      method: 'PATCH',
      authenticated: true,
      body: JSON.stringify(payload),
    })
  },

  async assignTask(taskId: number, payload: AssignTaskRequest): Promise<TaskResponse> {
    return apiRequest<TaskResponse>(`/api/v1/tasks/${taskId}/assignee`, {
      method: 'PATCH',
      authenticated: true,
      body: JSON.stringify(payload),
    })
  },
}
