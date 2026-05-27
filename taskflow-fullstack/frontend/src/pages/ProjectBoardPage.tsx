import { startTransition, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../components/ui/panel.css'
import { projectService } from '../services/project-service'
import { taskService } from '../services/task-service'
import type { ProjectMemberResponse, ProjectResponse } from '../types/project'
import type { AssignTaskRequest, CreateTaskRequest, TaskResponse, UpdateTaskStatusRequest } from '../types/task'

const laneOrder: Array<UpdateTaskStatusRequest['status']> = [
  'BACKLOG',
  'TODO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'DONE',
  'CANCELLED',
]

const priorityOptions: CreateTaskRequest['priority'][] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

function formatLaneTitle(status: UpdateTaskStatusRequest['status']) {
  return status.toLowerCase().replace(/_/g, ' ').replace(/(^| )\w/g, (character) => character.toUpperCase())
}

export function ProjectBoardPage() {
  const params = useParams<{ projectId: string }>()
  const projectId = Number(params.projectId)

  const [project, setProject] = useState<ProjectResponse | null>(null)
  const [members, setMembers] = useState<ProjectMemberResponse[]>([])
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [taskError, setTaskError] = useState<string | null>(null)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null)
  const [assigningTaskId, setAssigningTaskId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | CreateTaskRequest['priority']>('ALL')
  const [assigneeFilter, setAssigneeFilter] = useState<'ALL' | string>('ALL')
  const [taskForm, setTaskForm] = useState<CreateTaskRequest>({
    projectId,
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
  })

  useEffect(() => {
    if (!Number.isFinite(projectId)) {
      setError('Invalid project id')
      setIsLoading(false)
      return
    }

    let active = true

    async function loadBoard() {
      setIsLoading(true)
      setError(null)

      try {
        const [projectData, taskData, memberData] = await Promise.all([
          projectService.getProjectById(projectId),
          taskService.getTasksByProject(projectId),
          projectService.getProjectMembers(projectId),
        ])

        if (!active) {
          return
        }

        startTransition(() => {
          setProject(projectData)
          setTasks(taskData)
          setMembers(memberData)
          setTaskForm((current) => ({
            ...current,
            projectId,
          }))
        })
      } catch (caughtError) {
        if (active) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load project board')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadBoard()

    return () => {
      active = false
    }
  }, [projectId])

  function handleTaskFieldChange<K extends keyof CreateTaskRequest>(field: K, value: CreateTaskRequest[K]) {
    setTaskForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleCreateTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTaskError(null)
    setIsCreatingTask(true)

    try {
      const createdTask = await taskService.createTask({
        projectId,
        title: taskForm.title.trim(),
        description: taskForm.description?.trim() || undefined,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate || undefined,
      })

      startTransition(() => {
        setTasks((current) => [createdTask, ...current])
      })

      setTaskForm({
        projectId,
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: '',
      })
    } catch (caughtError) {
      setTaskError(caughtError instanceof Error ? caughtError.message : 'Unable to create task')
    } finally {
      setIsCreatingTask(false)
    }
  }

  async function handleStatusChange(taskId: number, status: UpdateTaskStatusRequest['status']) {
    setTaskError(null)
    setUpdatingTaskId(taskId)

    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, { status })

      startTransition(() => {
        setTasks((current) => current.map((task) => (task.id === taskId ? updatedTask : task)))
      })
    } catch (caughtError) {
      setTaskError(caughtError instanceof Error ? caughtError.message : 'Unable to update task status')
    } finally {
      setUpdatingTaskId(taskId)
      setUpdatingTaskId(null)
    }
  }

  async function handleAssigneeChange(taskId: number, assigneeUserId: string) {
    setTaskError(null)
    setAssigningTaskId(taskId)

    try {
      const payload: AssignTaskRequest = {
        assigneeUserId: Number(assigneeUserId),
      }
      const updatedTask = await taskService.assignTask(taskId, payload)

      startTransition(() => {
        setTasks((current) => current.map((task) => (task.id === taskId ? updatedTask : task)))
      })
    } catch (caughtError) {
      setTaskError(caughtError instanceof Error ? caughtError.message : 'Unable to assign task')
    } finally {
      setAssigningTaskId(null)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter
    const matchesAssignee =
      assigneeFilter === 'ALL' ||
      String(task.assigneeId ?? '') === assigneeFilter

    return matchesSearch && matchesPriority && matchesAssignee
  })

  const groupedTasks = laneOrder.map((status) => ({
    status,
    items: filteredTasks.filter((task) => task.status === status),
  }))

  return (
    <section className="panel-grid">
      <div className="panel-grid panel-grid--two">
        <div className="panel">
          <p className="shell__eyebrow">Board</p>
          <h3 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>
            {project ? `${project.name} delivery board` : 'Project board'}
          </h3>
          <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
            Live task lanes now read from the backend and support task creation plus status transitions.
          </p>
          <div className="badge-row">
            {project ? <span className="badge">{project.key}</span> : null}
            {project ? <span className="badge">{project.status}</span> : null}
            <span className="badge">{tasks.length} tasks</span>
            <span className="badge">{members.length} members</span>
          </div>
          <div className="button-row">
            <Link to="/projects" className="button-secondary">
              Back to projects
            </Link>
          </div>
        </div>

        <div className="panel">
          <p className="shell__eyebrow">Board Filters</p>
          <h4 style={{ marginTop: '0.75rem', fontSize: '1.35rem' }}>Slice work by search, priority, or assignee</h4>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="search-query">Search tasks</label>
              <input
                id="search-query"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by task title or description"
              />
            </div>

            <div className="panel-grid panel-grid--two" style={{ gap: '0.85rem' }}>
              <div className="field">
                <label htmlFor="priority-filter">Priority</label>
                <select
                  id="priority-filter"
                  value={priorityFilter}
                  onChange={(event) => setPriorityFilter(event.target.value as 'ALL' | CreateTaskRequest['priority'])}
                >
                  <option value="ALL">All priorities</option>
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="assignee-filter">Assignee</label>
                <select
                  id="assignee-filter"
                  value={assigneeFilter}
                  onChange={(event) => setAssigneeFilter(event.target.value)}
                >
                  <option value="ALL">All assignees</option>
                  {members.map((member) => (
                    <option key={member.userId} value={String(member.userId)}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="badge-row">
            <span className="badge">{filteredTasks.length} visible tasks</span>
          </div>
        </div>

        <div className="panel">
          <p className="shell__eyebrow">Create Task</p>
          <h4 style={{ marginTop: '0.75rem', fontSize: '1.35rem' }}>Add work to this board</h4>

          {taskError ? <div className="error-banner" style={{ marginTop: '1rem' }}>{taskError}</div> : null}

          <form className="form-grid" onSubmit={handleCreateTask}>
            <div className="field">
              <label htmlFor="task-title">Title</label>
              <input
                id="task-title"
                value={taskForm.title}
                onChange={(event) => handleTaskFieldChange('title', event.target.value)}
                placeholder="Design dashboard cards"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="task-description">Description</label>
              <textarea
                id="task-description"
                rows={4}
                value={taskForm.description ?? ''}
                onChange={(event) => handleTaskFieldChange('description', event.target.value)}
                placeholder="Describe the task outcome, acceptance criteria, or context."
              />
            </div>

            <div className="panel-grid panel-grid--two" style={{ gap: '0.85rem' }}>
              <div className="field">
                <label htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  value={taskForm.priority}
                  onChange={(event) => handleTaskFieldChange('priority', event.target.value as CreateTaskRequest['priority'])}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="task-due-date">Due date</label>
                <input
                  id="task-due-date"
                  type="date"
                  value={taskForm.dueDate ?? ''}
                  onChange={(event) => handleTaskFieldChange('dueDate', event.target.value)}
                />
              </div>
            </div>

            <div className="button-row">
              <button type="submit" className="button-primary" disabled={isCreatingTask || !project}>
                {isCreatingTask ? 'Creating task...' : 'Create task'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      <div className="panel-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {isLoading ? (
          <article className="panel">
            <h4>Loading board...</h4>
          </article>
        ) : (
          groupedTasks.map((lane) => (
            <article key={lane.status} className="panel">
              <h4>{formatLaneTitle(lane.status)}</h4>
              <p className="panel__muted" style={{ marginTop: '0.45rem' }}>
                {lane.items.length} task{lane.items.length === 1 ? '' : 's'}
              </p>

              <div className="list">
                {lane.items.length ? (
                  lane.items.map((task) => (
                    <div key={task.id} className="list-item">
                      <strong>{task.title}</strong>
                      <p className="panel__muted" style={{ marginTop: '0.55rem' }}>
                        {task.description ?? 'No task description yet.'}
                      </p>
                      <div className="badge-row">
                        <span className="badge">{task.priority}</span>
                        {task.dueDate ? <span className="badge">Due {task.dueDate}</span> : null}
                        {task.assigneeEmail ? <span className="badge">{task.assigneeEmail}</span> : null}
                      </div>
                      <div className="field" style={{ marginTop: '0.9rem' }}>
                        <label htmlFor={`task-assignee-${task.id}`}>Assignee</label>
                        <select
                          id={`task-assignee-${task.id}`}
                          value={task.assigneeId ? String(task.assigneeId) : ''}
                          disabled={assigningTaskId === task.id}
                          onChange={(event) => void handleAssigneeChange(task.id, event.target.value)}
                        >
                          <option value="" disabled>
                            Select assignee
                          </option>
                          {members.map((member) => (
                            <option key={member.userId} value={String(member.userId)}>
                              {member.firstName} {member.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field" style={{ marginTop: '0.9rem' }}>
                        <label htmlFor={`task-status-${task.id}`}>Status</label>
                        <select
                          id={`task-status-${task.id}`}
                          value={task.status}
                          disabled={updatingTaskId === task.id}
                          onChange={(event) =>
                            void handleStatusChange(task.id, event.target.value as UpdateTaskStatusRequest['status'])
                          }
                        >
                          {laneOrder.map((status) => (
                            <option key={status} value={status}>
                              {formatLaneTitle(status)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="list-item">
                    <span className="panel__muted">No tasks in this lane yet.</span>
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
