import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../features/auth/auth-context'
import './app-layout.css'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/projects', label: 'Projects' },
  { to: '/profile', label: 'Profile' },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <div className="brand-card">
          <div className="brand-card__eyebrow">TaskFlow</div>
          <h1>Flagship fullstack workspace</h1>
          <p>React shell aligned with the Spring Boot backend modules we already built.</p>
        </div>

        <nav className="shell__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `shell__nav-link${isActive ? ' shell__nav-link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="status-card">
          <span className="status-card__label">Current frontend slice</span>
          <strong>dashboard, projects, board, auth shell</strong>
          <p>Next we will connect API services, forms, and live state to the backend.</p>
          <div className="badge-row">
            <span className="badge">{user?.email ?? 'no-session'}</span>
            <span className="badge">{user?.roles?.join(', ') ?? 'guest'}</span>
          </div>
          <button type="button" className="shell__logout" onClick={() => void logout()}>
            Log out
          </button>
        </div>
      </aside>

      <main className="shell__main">
        <header className="shell__header">
          <div>
            <p className="shell__eyebrow">TaskFlow Frontend</p>
            <h2>Product shell for dashboard and Kanban workflows</h2>
          </div>
          <div className="shell__header-tags">
            <span>React + TypeScript</span>
            <span>Dark workspace UI</span>
            <span>Backend-ready routes</span>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}
