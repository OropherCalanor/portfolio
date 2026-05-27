import { apiRequest } from '../lib/api-client'
import type { CreateProjectRequest, ProjectMemberResponse, ProjectResponse } from '../types/project'

export const projectService = {
  async getProjects(): Promise<ProjectResponse[]> {
    return apiRequest<ProjectResponse[]>('/api/v1/projects', {
      method: 'GET',
      authenticated: true,
    })
  },

  async getProjectById(projectId: number): Promise<ProjectResponse> {
    return apiRequest<ProjectResponse>(`/api/v1/projects/${projectId}`, {
      method: 'GET',
      authenticated: true,
    })
  },

  async getProjectMembers(projectId: number): Promise<ProjectMemberResponse[]> {
    return apiRequest<ProjectMemberResponse[]>(`/api/v1/projects/${projectId}/members`, {
      method: 'GET',
      authenticated: true,
    })
  },

  async createProject(payload: CreateProjectRequest): Promise<ProjectResponse> {
    return apiRequest<ProjectResponse>('/api/v1/projects', {
      method: 'POST',
      authenticated: true,
      body: JSON.stringify(payload),
    })
  },
}
