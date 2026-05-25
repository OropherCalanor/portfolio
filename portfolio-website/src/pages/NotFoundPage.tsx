import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--color-border)] bg-white/85 p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[var(--color-ink)]">Page not found</h1>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
            The page you are looking for does not exist yet, but the portfolio is still being expanded project by project.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-surface)]"
          >
            Return Home
          </Link>
        </div>
      </Container>
    </section>
  )
}
