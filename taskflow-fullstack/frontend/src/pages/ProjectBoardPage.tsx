import '../components/ui/panel.css'

const lanes: Array<{ title: string; items: string[] }> = [
  { title: 'Backlog', items: ['Define dashboard metrics', 'Prepare project membership UX'] },
  { title: 'In Progress', items: ['Implement task status flow', 'Wire auth state'] },
  { title: 'In Review', items: ['Polish route structure'] },
  { title: 'Done', items: ['Backend auth foundation', 'Project CRUD foundation'] },
]

export function ProjectBoardPage() {
  return (
    <section className="panel-grid">
      <div className="panel">
        <p className="shell__eyebrow">Board</p>
        <h3 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>Kanban board shell for TaskFlow delivery stages</h3>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          The board will eventually connect to live tasks and status transitions from the backend task module.
        </p>
      </div>

      <div className="panel-grid panel-grid--two">
        {lanes.map((lane) => (
          <article key={lane.title} className="panel">
            <h4>{lane.title}</h4>
            <div className="list">
              {lane.items.map((item) => (
                <div key={item} className="list-item">
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
