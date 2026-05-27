import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './auth-context'
import '../../components/ui/panel.css'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
        <section className="panel" style={{ maxWidth: '520px', width: '100%' }}>
          <p className="shell__eyebrow">Session</p>
          <h1 style={{ marginTop: '0.75rem', fontSize: '2rem' }}>Restoring TaskFlow workspace</h1>
          <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
            We are checking the saved session and loading the current user context.
          </p>
        </section>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

