import { startTransition, useEffect, useState } from 'react'
import { dashboardService } from '../services/dashboard-service'
import type { DashboardSummaryResponse, DashboardTaskItem } from '../types/dashboard'
import '../components/ui/panel.css'

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null)
  const [myTasks, setMyTasks] = useState<DashboardTaskItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadDashboard() {
      setIsLoading(true)
      setError(null)

      try {
        const [summaryData, myTasksData] = await Promise.all([
          dashboardService.getSummary(),
          dashboardService.getMyTasks(),
        ])

        if (!active) {
          return
        }

        startTransition(() => {
          setSummary(summaryData)
          setMyTasks(myTasksData)
        })
      } catch (caughtError) {
        if (active) {
          setError(caughtError instanceof Error ? caughtError.message : 'Unable to load dashboard data')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    void loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const summaryCards = [
    [String(summary?.projectCount ?? 0), 'projects in active workspace scope'],
    [String(summary?.assignedTaskCount ?? 0), 'tasks assigned to the current user'],
    [String(summary?.upcomingDeadlines.length ?? 0), 'upcoming deadlines highlighted in the dashboard'],
  ]

  return (
    <section className="panel-grid">
      <div className="panel">
        <p className="shell__eyebrow">Dashboard</p>
        <h3 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>A command view for projects, workload, and delivery risk</h3>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          This page now consumes the backend dashboard endpoints and is ready for richer card visuals and charts.
        </p>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      <div className="panel-grid panel-grid--three">
        {summaryCards.map(([value, label]) => (
          <article key={label} className="panel">
            <p className="shell__eyebrow">Signal</p>
            <div className="stat-value">{value}</div>
            <p className="panel__muted">{label}</p>
          </article>
        ))}
      </div>

      <div className="panel-grid panel-grid--two">
        <article className="panel">
          <h4>Upcoming deadlines</h4>
          <div className="list">
            {isLoading ? (
              <div className="list-item">
                <strong>Loading upcoming deadlines...</strong>
              </div>
            ) : summary?.upcomingDeadlines.length ? (
              summary.upcomingDeadlines.map((item) => (
                <div key={item.id} className="list-item">
                  <strong>{item.title}</strong>
                  <p className="panel__muted" style={{ marginTop: '0.35rem' }}>
                    {item.projectName} · {item.priority} · {item.dueDate ?? 'No due date'}
                  </p>
                </div>
              ))
            ) : (
              <div className="list-item">
                <strong>No upcoming deadlines right now.</strong>
              </div>
            )}
          </div>
        </article>

        <article className="panel">
          <h4>Assigned tasks snapshot</h4>
          <div className="list">
            {isLoading ? (
              <div className="list-item">
                <strong>Loading assigned tasks...</strong>
              </div>
            ) : myTasks.length ? (
              myTasks.slice(0, 4).map((item) => (
                <div key={item.id} className="list-item">
                  <strong>{item.title}</strong>
                  <p className="panel__muted" style={{ marginTop: '0.35rem' }}>
                    {item.projectName} · {item.status} · {item.priority}
                  </p>
                </div>
              ))
            ) : (
              <div className="list-item">
                <strong>No assigned tasks yet.</strong>
              </div>
            )}
          </div>
          <div className="badge-row">
            {Object.entries(summary?.tasksByStatus ?? {}).map(([key, value]) => (
              <span key={key} className="badge">
                {key}: {value}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
