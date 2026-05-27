import { startTransition, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/project-service'
import type { CreateProjectRequest, ProjectResponse } from '../types/project'
import '../components/ui/panel.css'

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)
  const [projectForm, setProjectForm] = useState<CreateProjectRequest>({
    name: '',
    key: '',
    description: '',
  })

  useEffect(() => {
    let active = true

    async function loadProjects() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await projectService.getProjects()

        if (!active) {
          return
        }

        startTransition(() => {
          setProjects(data)
        })
      } catch (caughtError) {
        if (active) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load projects')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadProjects()

    return () => {
      active = false
    }
  }, [])

  function handleFieldChange(field: keyof CreateProjectRequest, value: string) {
    setProjectForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleCreateProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCreateError(null)
    setIsCreating(true)

    try {
      const payload: CreateProjectRequest = {
        name: projectForm.name.trim(),
        key: projectForm.key.trim().toUpperCase(),
        description: projectForm.description?.trim() || undefined,
      }

      const createdProject = await projectService.createProject(payload)

      startTransition(() => {
        setProjects((current) => [createdProject, ...current])
      })

      setProjectForm({
        name: '',
        key: '',
        description: '',
      })
    } catch (caughtError) {
      setCreateError(caughtError instanceof Error ? caughtError.message : 'Unable to create project')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <section className="panel-grid">
      <div className="panel-grid panel-grid--two">
        <div className="panel">
          <p className="shell__eyebrow">Projects</p>
          <h3 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>Project workspace and delivery setup</h3>
          <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
            Create a project here, then open the board to start building live task lanes against the backend.
          </p>
          <div className="badge-row">
            <span className="badge">{projects.length} total projects</span>
            <span className="badge">Spring Boot + React live flow</span>
          </div>
        </div>

        <div className="panel">
          <p className="shell__eyebrow">Create Project</p>
          <h4 style={{ marginTop: '0.75rem', fontSize: '1.35rem' }}>Spin up a new workspace</h4>

          {createError ? <div className="error-banner" style={{ marginTop: '1rem' }}>{createError}</div> : null}

          <form className="form-grid" onSubmit={handleCreateProject}>
            <div className="field">
              <label htmlFor="project-name">Project name</label>
              <input
                id="project-name"
                value={projectForm.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
                placeholder="TaskFlow Launch"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="project-key">Project key</label>
              <input
                id="project-key"
                value={projectForm.key}
                onChange={(event) => handleFieldChange('key', event.target.value.replace(/\s+/g, '').toUpperCase())}
                placeholder="TFL"
                maxLength={20}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="project-description">Description</label>
              <textarea
                id="project-description"
                rows={4}
                value={projectForm.description ?? ''}
                onChange={(event) => handleFieldChange('description', event.target.value)}
                placeholder="Describe the workflow, stakeholders, or delivery goal."
              />
            </div>

            <div className="button-row">
              <button type="submit" className="button-primary" disabled={isCreating}>
                {isCreating ? 'Creating project...' : 'Create project'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      <div className="panel-grid panel-grid--three">
        {isLoading ? (
          <article className="panel">
            <h4>Loading projects...</h4>
          </article>
        ) : projects.length ? (
          projects.map((project) => (
            <article key={project.id} className="panel">
              <p className="shell__eyebrow">{project.key}</p>
              <h4 style={{ marginTop: '0.8rem', fontSize: '1.2rem' }}>{project.name}</h4>
              <p className="panel__muted" style={{ marginTop: '0.75rem' }}>
                {project.description ?? 'No project description provided yet.'}
              </p>
              <div className="badge-row">
                <span className="badge">{project.status}</span>
                <span className="badge">{project.ownerEmail}</span>
              </div>
              <div className="button-row">
                <Link to={`/projects/${project.id}/board`} className="button-primary">
                  Open board
                </Link>
              </div>
            </article>
          ))
        ) : (
          <article className="panel">
            <h4>No projects found.</h4>
            <p className="panel__muted" style={{ marginTop: '0.75rem' }}>
              Create a project through the backend flow first, then this screen will populate automatically.
            </p>
          </article>
        )}
      </div>
    </section>
  )
}
