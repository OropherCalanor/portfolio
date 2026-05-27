import '../components/ui/panel.css'

export function ProfilePage() {
  return (
    <section className="panel-grid panel-grid--two">
      <article className="panel">
        <p className="shell__eyebrow">Profile</p>
        <h3 style={{ marginTop: '0.75rem', fontSize: '1.9rem' }}>Current user workspace identity</h3>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          This screen will later consume `/api/v1/auth/me` and show project memberships, role context, and assigned work.
        </p>
      </article>

      <article className="panel">
        <h4>Planned sections</h4>
        <div className="list">
          {['Account basics', 'Assigned tasks summary', 'Project memberships', 'Session and auth state'].map((item) => (
            <div key={item} className="list-item">
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
