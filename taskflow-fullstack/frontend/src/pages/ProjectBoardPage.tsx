import { startTransition, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../components/ui/panel.css'
import { useAuth } from '../features/auth/auth-context'
import { projectService } from '../services/project-service'
import { taskService } from '../services/task-service'
import type { AddProjectMemberRequest, ProjectMemberResponse, ProjectResponse } from '../types/project'
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
const membershipRoleOptions: AddProjectMemberRequest['membershipRole'][] = ['MANAGER', 'CONTRIBUTOR', 'VIEWER']

function formatLaneTitle(status: UpdateTaskStatusRequest['status']) {
  return status.toLowerCase().replace(/_/g, ' ').replace(/(^| )\w/g, (character) => character.toUpperCase())
}

function normalizeDueDate(value?: string) {
  if (!value) {
    return undefined
  }

  const trimmed = value.trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }

  const localizedDateMatch = trimmed.match(/^(\d{2})[./-](\d{2})[./-](\d{4})$/)
  if (localizedDateMatch) {
    const [, day, month, year] = localizedDateMatch
    return `${year}-${month}-${day}`
  }

  return trimmed
}

function isDueSoon(date?: string | null) {
  if (!date) {
    return false
  }

  const today = new Date()
  const dueDate = new Date(`${date}T00:00:00`)
  const differenceInMs = dueDate.getTime() - today.getTime()
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)
  return differenceInDays >= 0 && differenceInDays <= 3
}

export function ProjectBoardPage() {
  const params = useParams<{ projectId: string }>()
  const projectId = Number(params.projectId)
  const { user } = useAuth()

  const [project, setProject] = useState<ProjectResponse | null>(null)
  const [members, setMembers] = useState<ProjectMemberResponse[]>([])
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [taskError, setTaskError] = useState<string | null>(null)
  const [memberError, setMemberError] = useState<string | null>(null)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [updatingTaskId, setUpdatingTaskId] = useState<number | null>(null)
  const [assigningTaskId, setAssigningTaskId] = useState<number | null>(null)
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null)
  const [dragOverLane, setDragOverLane] = useState<UpdateTaskStatusRequest['status'] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyMyTasks, setShowOnlyMyTasks] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | CreateTaskRequest['priority']>('ALL')
  const [assigneeFilter, setAssigneeFilter] = useState<'ALL' | string>('ALL')
  const [taskForm, setTaskForm] = useState<CreateTaskRequest>({
    projectId,
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
  })
  const [memberForm, setMemberForm] = useState<AddProjectMemberRequest>({
    email: '',
    membershipRole: 'CONTRIBUTOR',
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

  function handleMemberFieldChange<K extends keyof AddProjectMemberRequest>(field: K, value: AddProjectMemberRequest[K]) {
    setMemberForm((current) => ({
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
        dueDate: normalizeDueDate(taskForm.dueDate),
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

  function handleTaskDragStart(taskId: number) {
    setDraggingTaskId(taskId)
  }

  function handleTaskDragEnd() {
    setDraggingTaskId(null)
    setDragOverLane(null)
  }

  async function handleLaneDrop(status: UpdateTaskStatusRequest['status']) {
    if (!draggingTaskId) {
      return
    }

    const draggedTask = tasks.find((task) => task.id === draggingTaskId)
    if (!draggedTask || draggedTask.status === status) {
      handleTaskDragEnd()
      return
    }

    await handleStatusChange(draggingTaskId, status)
    handleTaskDragEnd()
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

  async function handleAddMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMemberError(null)
    setIsAddingMember(true)

    try {
      const createdMember = await projectService.addProjectMember(projectId, {
        email: memberForm.email.trim(),
        membershipRole: memberForm.membershipRole,
      })

      startTransition(() => {
        setMembers((current) => [...current, createdMember])
      })

      setMemberForm({
        email: '',
        membershipRole: 'CONTRIBUTOR',
      })
    } catch (caughtError) {
      setMemberError(caughtError instanceof Error ? caughtError.message : 'Unable to add member')
    } finally {
      setIsAddingMember(false)
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
    const matchesOwnership =
      !showOnlyMyTasks ||
      task.assigneeId === user?.id ||
      task.reporterId === user?.id

    return matchesSearch && matchesPriority && matchesAssignee && matchesOwnership
  })

  const groupedTasks = laneOrder.map((status) => {
    const items = filteredTasks.filter((task) => task.status === status)

    return {
      status,
      items,
      highPriorityCount: items.filter((task) => task.priority === 'HIGH' || task.priority === 'CRITICAL').length,
      dueSoonCount: items.filter((task) => isDueSoon(task.dueDate)).length,
    }
  })

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
            <label className="toggle-row" htmlFor="my-tasks-toggle">
              <input
                id="my-tasks-toggle"
                type="checkbox"
                checked={showOnlyMyTasks}
                onChange={(event) => setShowOnlyMyTasks(event.target.checked)}
              />
              <span>Show only tasks I own or am assigned to</span>
            </label>
          </div>
          <div className="badge-row">
            <span className="badge">{filteredTasks.length} visible tasks</span>
          </div>
        </div>

        <div className="panel">
          <p className="shell__eyebrow">Members</p>
          <h4 style={{ marginTop: '0.75rem', fontSize: '1.35rem' }}>Add project collaborators</h4>
          <p className="panel__muted" style={{ marginTop: '0.65rem' }}>
            Add an existing user by email, then assign tasks directly from the board.
          </p>

          {memberError ? <div className="error-banner" style={{ marginTop: '1rem' }}>{memberError}</div> : null}

          <form className="form-grid" onSubmit={handleAddMember}>
            <div className="field">
              <label htmlFor="member-email">User email</label>
              <input
                id="member-email"
                type="email"
                value={memberForm.email}
                onChange={(event) => handleMemberFieldChange('email', event.target.value)}
                placeholder="teammate@example.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="membership-role">Membership role</label>
              <select
                id="membership-role"
                value={memberForm.membershipRole}
                onChange={(event) => handleMemberFieldChange('membershipRole', event.target.value as AddProjectMemberRequest['membershipRole'])}
              >
                {membershipRoleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-row">
              <button type="submit" className="button-secondary" disabled={isAddingMember}>
                {isAddingMember ? 'Adding member...' : 'Add member'}
              </button>
            </div>
          </form>

          <div className="list">
            {members.map((member) => (
              <div key={member.userId} className="list-item">
                <strong>{member.firstName} {member.lastName}</strong>
                <p className="panel__muted" style={{ marginTop: '0.35rem' }}>
                  {member.email} · {member.membershipRole}
                </p>
              </div>
            ))}
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
            <article
              key={lane.status}
              className={`panel kanban-lane${dragOverLane === lane.status ? ' kanban-lane--active' : ''}`}
              onDragOver={(event) => {
                event.preventDefault()
                setDragOverLane(lane.status)
              }}
              onDragLeave={() => {
                if (dragOverLane === lane.status) {
                  setDragOverLane(null)
                }
              }}
              onDrop={(event) => {
                event.preventDefault()
                void handleLaneDrop(lane.status)
              }}
            >
              <h4>{formatLaneTitle(lane.status)}</h4>
              <p className="panel__muted" style={{ marginTop: '0.45rem' }}>
                {lane.items.length} task{lane.items.length === 1 ? '' : 's'}
              </p>
              <div className="badge-row" style={{ marginTop: '0.6rem' }}>
                <span className="badge">{lane.highPriorityCount} high focus</span>
                <span className="badge">{lane.dueSoonCount} due soon</span>
              </div>

              <div className="list">
                {lane.items.length ? (
                  lane.items.map((task) => (
                    <div
                      key={task.id}
                      className={`list-item kanban-card${draggingTaskId === task.id ? ' kanban-card--dragging' : ''}`}
                      draggable={updatingTaskId !== task.id}
                      onDragStart={() => handleTaskDragStart(task.id)}
                      onDragEnd={handleTaskDragEnd}
                    >
                      <strong>{task.title}</strong>
                      <p className="panel__muted" style={{ marginTop: '0.55rem' }}>
                        {task.description ?? 'No task description yet.'}
                      </p>
                      <div className="badge-row">
                        <span className={`badge badge--priority badge--priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                        {task.dueDate ? <span className="badge">Due {task.dueDate}</span> : null}
                        {task.assigneeEmail ? <span className="badge">{task.assigneeEmail}</span> : null}
                        {task.reporterId === user?.id ? <span className="badge">Reported by me</span> : null}
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
