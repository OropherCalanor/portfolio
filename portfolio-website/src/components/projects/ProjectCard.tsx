import { Link } from 'react-router-dom'
import type { Project } from '../../types/content'
import { TagList } from '../ui/TagList'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(17,24,48,0.78),rgba(8,12,26,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_32px_rgba(110,240,255,0.1)]">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-[var(--color-border)] bg-[color:rgba(110,240,255,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {project.status.replace('-', ' ')}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {project.category}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{project.name}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>

      <div className="mt-6">
        <TagList items={project.stack} />
      </div>

      <div className="mt-6 flex-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink)]">What it proves</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-muted)]">
          {project.whatItProves.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={`/projects/${project.slug}`}
          className="rounded-full border border-[var(--color-border-strong)] bg-[linear-gradient(90deg,rgba(110,240,255,0.16),rgba(255,79,216,0.14))] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
        >
          Case Study
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.02)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
        >
          GitHub
        </a>
      </div>
    </article>
  )
}
