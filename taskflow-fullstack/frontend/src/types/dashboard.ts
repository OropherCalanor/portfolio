export type DashboardTaskItem = {
  id: number
  projectId: number
  projectName: string
  title: string
  status: string
  priority: string
  dueDate: string | null
}

export type DashboardSummaryResponse = {
  projectCount: number
  assignedTaskCount: number
  tasksByStatus: Record<string, number>
  tasksByPriority: Record<string, number>
  upcomingDeadlines: DashboardTaskItem[]
}

