import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/auth-context'
import '../components/ui/panel.css'

export function RegisterPage() {
  const { register, error, clearError, isLoading } = useAuth()
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('Ruhat')
  const [lastName, setLastName] = useState('Karatas')
  const [email, setEmail] = useState('ruhat@example.com')
  const [password, setPassword] = useState('Password1')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clearError()

    try {
      await register({ firstName, lastName, email, password })
      navigate('/', { replace: true })
    } catch {
      // handled by auth context
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
      <section className="panel" style={{ maxWidth: '560px', width: '100%' }}>
        <p className="shell__eyebrow">Authentication</p>
        <h1 style={{ marginTop: '0.75rem', fontSize: '2.2rem' }}>Create your TaskFlow account</h1>
        <p className="panel__muted" style={{ marginTop: '0.9rem' }}>
          Registration now talks to the backend auth module and immediately creates a session for the new user.
        </p>

        {error ? <div className="error-banner" style={{ marginTop: '1rem' }}>{error}</div> : null}

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="registerEmail">Email</label>
            <input id="registerEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="registerPassword">Password</label>
            <input
              id="registerPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="button-row">
            <button type="submit" className="button-primary" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
            <Link to="/login" className="inline-link">
              I already have an account
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
