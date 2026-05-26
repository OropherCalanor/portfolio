import { useDeferredValue, useState } from 'react'
import { ProjectCard } from '../components/projects/ProjectCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { categoryLabels, featuredProjects, flagshipProjects, miniProjects, proofProjects, projects, projectsByCategory } from '../data/projects'
import type { ProjectCategory, ProjectStatus, ProjectTier } from '../types/content'

export function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectCategory>('all')
  const [selectedTier, setSelectedTier] = useState<'all' | ProjectTier>('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProjectStatus>('all')

  const deferredSearch = useDeferredValue(search)
  const normalizedSearch = deferredSearch.trim().toLowerCase()

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      project.name.toLowerCase().includes(normalizedSearch) ||
      project.summary.toLowerCase().includes(normalizedSearch) ||
      project.stack.some((item) => item.toLowerCase().includes(normalizedSearch)) ||
      project.whatItProves.some((item) => item.toLowerCase().includes(normalizedSearch))

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesTier = selectedTier === 'all' || project.tier === selectedTier
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus

    return matchesSearch && matchesCategory && matchesTier && matchesStatus
  })

  const filteredProjectIds = new Set(filteredProjects.map((project) => project.slug))
  const filteredFeaturedProjects = featuredProjects.filter((project) => filteredProjectIds.has(project.slug))
  const filteredGroups = projectsByCategory
    .map((group) => ({
      ...group,
      items: group.items.filter((project) => filteredProjectIds.has(project.slug)),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section className="py-18 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Repositories built to prove specific engineering strengths"
          description="This archive is designed for scale. The goal is to grow toward a 15-20 project ecosystem without turning the portfolio into a random list of demos. Featured projects lead, while the rest of the archive stays organized by category and project role."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {[
            ['Total Projects', String(projects.length)],
            ['Flagship', String(flagshipProjects.length)],
            ['Proof Projects', String(proofProjects.length)],
            ['Mini Projects', String(miniProjects.length)],
          ].map(([label, value]) => (
            <article key={label} className="rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.78),rgba(8,12,24,0.96))] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">{label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)]">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <a
              key={key}
              href={`#category-${key}`}
              className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-[1.8rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.78),rgba(8,12,24,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project, stack, or signal"
                className="mt-3 w-full rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-border-strong)]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Category</span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value as 'all' | ProjectCategory)}
                className="mt-3 w-full rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-border-strong)]"
              >
                <option value="all">All categories</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Tier</span>
              <select
                value={selectedTier}
                onChange={(event) => setSelectedTier(event.target.value as 'all' | ProjectTier)}
                className="mt-3 w-full rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-border-strong)]"
              >
                <option value="all">All tiers</option>
                <option value="flagship">Flagship</option>
                <option value="proof">Proof</option>
                <option value="mini">Mini</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Status</span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value as 'all' | ProjectStatus)}
                className="mt-3 w-full rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-border-strong)]"
              >
                <option value="all">All statuses</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In progress</option>
                <option value="planned">Planned</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm leading-7 text-[var(--color-muted)]">
              Showing <span className="font-semibold text-[var(--color-ink)]">{filteredProjects.length}</span> of{' '}
              <span className="font-semibold text-[var(--color-ink)]">{projects.length}</span> projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
                setSelectedTier('all')
                setSelectedStatus('all')
              }}
              className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-2 text-sm font-medium text-[var(--color-muted)]"
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="mt-18">
          <SectionHeading
            eyebrow="Featured"
            title="The projects I want recruiters to see first"
            description="These are the strongest current signals in the ecosystem: backend proof, security proof, portfolio presentation, and future flagship product work."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {filteredFeaturedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {filteredFeaturedProjects.length === 0 ? (
            <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">No featured projects match the current filters.</p>
          ) : null}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Archive"
            title="A project library built to grow to 15-20 meaningful repos"
            description="Instead of showing every project at the same weight, the archive groups work by category. This keeps the portfolio scalable while still making smaller proof repos valuable."
          />

          <div className="mt-12 space-y-16">
            {filteredGroups.map((group) => (
              <section key={group.key} id={`category-${group.key}`}>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{group.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {group.items.length} project{group.items.length === 1 ? '' : 's'} in this category.
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  {group.items.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </section>
            ))}
            {filteredGroups.length === 0 ? (
              <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.76),rgba(8,12,24,0.96))] p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">No results</p>
                <p className="mt-4 text-lg font-semibold text-[var(--color-ink)]">No projects matched the current filters.</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  Try clearing filters or searching with broader keywords like Spring Boot, React, backend, or auth.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
