import { Navigate, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { TagList } from '../components/ui/TagList'
import { projects } from '../data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <section className="py-18 sm:py-24">
      <Container>
        <div className="max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
            {project.category} · {project.status.replace('-', ' ')}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">{project.description}</p>
          <div className="mt-8">
            <TagList items={project.stack} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold text-[var(--color-surface)]"
            >
              View GitHub
            </a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)]"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[
            { title: 'Problem', items: [project.problem] },
            { title: 'Solution', items: [project.solution] },
            { title: 'Key Features', items: project.keyFeatures },
            { title: 'What It Proves', items: project.whatItProves },
            { title: 'Architecture', items: project.architecture },
            { title: 'Database Design', items: project.databaseDesign },
            {
              title: 'What I Learned',
              items: project.learned.length ? project.learned : ['Notes will be added as the implementation evolves.'],
            },
            { title: 'Future Improvements', items: project.futureImprovements },
          ].map((section) => (
            <article key={section.title} className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/90 p-6">
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
