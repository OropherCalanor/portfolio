import { Container } from '../ui/Container'
import { siteConfig } from '../../data/site'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[color:rgba(3,5,14,0.6)] py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-ink)]">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
              Building recruiter-ready fullstack projects with Java, Spring Boot, React, PostgreSQL, and a documentation-first mindset.
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{siteConfig.availability}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--color-ink)]">
              Email
            </a>
            <a href={siteConfig.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)]">
              GitHub
            </a>
            {siteConfig.linkedinUrl ? (
              <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--color-ink)]">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  )
}
