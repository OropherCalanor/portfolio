import { NavLink } from 'react-router-dom'
import { Container } from '../ui/Container'
import { siteConfig } from '../../data/site'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color:rgba(6,8,22,0.78)] backdrop-blur-xl">
      <Container>
        <div className="flex min-h-18 items-center justify-between gap-4">
          <div>
            <NavLink to="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-ink)]">
              BRK
            </NavLink>
            <p className="mt-1 hidden text-sm text-[var(--color-muted)] sm:block">{siteConfig.role}</p>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border border-[var(--color-border-strong)] bg-[color:rgba(110,240,255,0.12)] text-[var(--color-accent)] shadow-[0_0_22px_rgba(110,240,255,0.16)]'
                      : 'text-[var(--color-muted)] hover:bg-[color:rgba(110,240,255,0.08)] hover:text-[var(--color-ink)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {siteConfig.cvUrl ? (
              <a
                href={siteConfig.cvUrl}
                className="hidden rounded-full border border-[var(--color-border-strong)] bg-[color:rgba(255,79,216,0.08)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:-translate-y-0.5 hover:bg-[color:rgba(255,79,216,0.16)] sm:inline-flex"
              >
                Download CV
              </a>
            ) : (
              <span className="hidden rounded-full border border-dashed border-[var(--color-border)] bg-[color:rgba(255,255,255,0.02)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] sm:inline-flex">
                CV on request
              </span>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
