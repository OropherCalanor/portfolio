import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { TagList } from '../components/ui/TagList'
import { ProjectCard } from '../components/projects/ProjectCard'
import { projects } from '../data/projects'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState<number | null>(null)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  useEffect(() => {
    setSelectedScreenshotIndex(null)
  }, [project.slug])

  useEffect(() => {
    if (selectedScreenshotIndex === null) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedScreenshotIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedScreenshotIndex])

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .filter((item) => item.category === project.category || item.tier === project.tier)
    .slice(0, 3)

  const isPlannedOrInProgress = project.status !== 'completed'
  const selectedScreenshot =
    selectedScreenshotIndex !== null && project.screenshots ? project.screenshots[selectedScreenshotIndex] : null

  const sectionCards = [
    { title: 'Problem', items: [project.problem] },
    { title: 'Solution', items: [project.solution] },
    { title: 'Key Features', items: project.keyFeatures },
    { title: 'What It Proves', items: project.whatItProves },
    { title: 'Architecture', items: project.architecture },
    { title: 'Database Design', items: project.databaseDesign },
    {
      title: 'Verification',
      items: project.verification?.length ? project.verification : ['Verification notes will be added as the implementation matures.'],
    },
    {
      title: 'Repository Highlights',
      items: project.repositoryHighlights?.length
        ? project.repositoryHighlights
        : ['Repository documentation and review details will be expanded as the project evolves.'],
    },
    {
      title: 'What I Learned',
      items: project.learned.length ? project.learned : ['Notes will be added as the implementation evolves.'],
    },
    { title: 'Future Improvements', items: project.futureImprovements },
  ]

  return (
    <section className="py-18 sm:py-24">
      <Container>
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="max-w-5xl">
            <Link
              to="/projects"
              className="inline-flex rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]"
            >
              Back to projects
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              {project.tier} · {project.category} · {project.status.replace('-', ' ')}
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
                className="rounded-full border border-[var(--color-border-strong)] bg-[linear-gradient(90deg,rgba(110,240,255,0.18),rgba(255,79,216,0.16))] px-5 py-3 text-sm font-semibold text-[var(--color-ink)]"
              >
                View GitHub
              </a>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)]"
                >
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>

          <aside className="rounded-[1.9rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.78),rgba(8,12,24,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">Quick summary</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Project role</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{project.tier}</p>
              </article>
              <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Category</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{project.category}</p>
              </article>
              <article className="rounded-[1.4rem] border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Primary signal</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{project.whatItProves[0]}</p>
              </article>
            </div>
            <div className="mt-6 rounded-[1.4rem] border border-[var(--color-border)] bg-[color:rgba(110,240,255,0.05)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Why it matters</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                This page is designed to explain not only what the project does, but why it belongs in the portfolio and what specific engineering strengths it demonstrates.
              </p>
            </div>
            {isPlannedOrInProgress && project.buildFocus ? (
              <div className="mt-6 rounded-[1.4rem] border border-[var(--color-border-strong)] bg-[linear-gradient(135deg,rgba(110,240,255,0.08),rgba(255,79,216,0.08))] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Build Focus</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{project.buildFocus}</p>
              </div>
            ) : null}
          </aside>
        </div>

        {isPlannedOrInProgress && project.nextMilestones?.length ? (
          <div className="mt-10 rounded-[1.75rem] border border-[var(--color-border-strong)] bg-[linear-gradient(135deg,rgba(10,18,38,0.9),rgba(24,11,49,0.82))] p-6 shadow-[0_0_36px_rgba(110,240,255,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Next Milestones</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-3xl">
              What comes next for this project
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.nextMilestones.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.2rem] border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-4 text-sm leading-7 text-[var(--color-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.screenshots?.length ? (
          <div className="mt-10">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Visual Walkthrough</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                Screenshots from the working project
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                These screenshots help reviewers understand the implementation quickly before opening the repository in detail.
              </p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-color:rgba(110,240,255,0.35)_transparent]">
              {project.screenshots.map((shot, index) => (
                <button
                  key={shot.src}
                  type="button"
                  onClick={() => setSelectedScreenshotIndex(index)}
                  className="group min-w-[17rem] max-w-[17rem] shrink-0 overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.76),rgba(8,12,24,0.96))] text-left shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:border-[var(--color-border-strong)] sm:min-w-[19rem] sm:max-w-[19rem]"
                >
                  <div className="h-48 overflow-hidden border-b border-[var(--color-border)] bg-[color:rgba(255,255,255,0.02)] sm:h-52">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-sm font-semibold text-[var(--color-ink)]">{shot.alt}</p>
                    {shot.caption ? (
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{shot.caption}</p>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {sectionCards.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.76),rgba(8,12,24,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
            >
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {relatedProjects.length ? (
          <div className="mt-18">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">Related Projects</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                More projects in the same portfolio layer
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                These projects connect to the same skill area or portfolio goal, so reviewers can move through the ecosystem instead of evaluating each repository in isolation.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedProjects.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>

      {selectedScreenshot ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:rgba(2,6,18,0.82)] p-4 backdrop-blur-sm"
          onClick={() => setSelectedScreenshotIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-[var(--color-border-strong)] bg-[linear-gradient(180deg,rgba(14,20,40,0.96),rgba(8,12,24,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.42)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedScreenshotIndex(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-[var(--color-border)] bg-[color:rgba(8,12,24,0.86)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-ink)]"
            >
              Close
            </button>
            <div className="max-h-[78vh] overflow-auto">
              <img src={selectedScreenshot.src} alt={selectedScreenshot.alt} className="h-auto w-full object-contain" />
            </div>
            <div className="border-t border-[var(--color-border)] px-6 py-5">
              <p className="text-base font-semibold text-[var(--color-ink)]">{selectedScreenshot.alt}</p>
              {selectedScreenshot.caption ? (
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{selectedScreenshot.caption}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
