import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/auth-context'
import '../components/ui/panel.css'

export function LoginPage() {
  const { login, error, clearError, isLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('ruhat@example.com')
  const [password, setPassword] = useState('Password1')

  const redirectPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/'

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearError()

    try {
      await login({ email, password })
      navigate(redirectPath, { replace: true })
    } catch {
      // handled by auth context
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
      <section className="panel" style={{ maxWidth: '560px', width: '100%' }}>
        <p className="shell__eyebrow">Authentication</p>
        <h1 style={{ marginTop: '0.75rem', fontSize: '2.2rem' }}>Log in to TaskFlow</h1>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          The login form now targets the live backend auth endpoint and persists the JWT session in the frontend auth store.
        </p>

        {error ? <div className="error-banner" style={{ marginTop: '1rem' }}>{error}</div> : null}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="button-row">
            <button type="submit" className="button-primary" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            <Link to="/register" className="inline-link">
              Create account
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
