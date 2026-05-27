import { startTransition, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/project-service'
import type { ProjectResponse } from '../types/project'
import '../components/ui/panel.css'

export function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <section className="panel-grid">
      <div className="panel">
        <p className="shell__eyebrow">Projects</p>
        <h3 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>Project list and workspace navigation shell</h3>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          This page now reads from the live backend project endpoint and is ready for richer project detail routing.
        </p>
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
