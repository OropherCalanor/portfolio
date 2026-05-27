import { apiRequest } from '../lib/api-client'
import type { DashboardSummaryResponse, DashboardTaskItem } from '../types/dashboard'

export const dashboardService = {
  async getSummary(): Promise<DashboardSummaryResponse> {
    return apiRequest<DashboardSummaryResponse>('/api/v1/dashboard/summary', {
      method: 'GET',
      authenticated: true,
    })
  },

  async getMyTasks(): Promise<DashboardTaskItem[]> {
    return apiRequest<DashboardTaskItem[]>('/api/v1/dashboard/my-tasks', {
      method: 'GET',
      authenticated: true,
    })
  },

  async getUpcomingDeadlines(): Promise<DashboardTaskItem[]> {
    return apiRequest<DashboardTaskItem[]>('/api/v1/dashboard/upcoming-deadlines', {
      method: 'GET',
      authenticated: true,
    })
  },
}

