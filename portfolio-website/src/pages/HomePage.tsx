import { motion } from 'framer-motion'
import { blogPosts } from '../data/blog-posts'
import { featuredProjects } from '../data/projects'
import { siteConfig } from '../data/site'
import { skillGroups } from '../data/skills'
import { BlogCard } from '../components/blog/BlogCard'
import { ProjectCard } from '../components/projects/ProjectCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const proofBlocks = [
  {
    title: 'Backend Depth',
    description: 'Spring Boot APIs built with layered architecture, validation, PostgreSQL integration, Swagger documentation, and Docker support.',
  },
  {
    title: 'Security Knowledge',
    description: 'JWT authentication, refresh token flow, role-based access control, and protected route design separated into a dedicated auth project.',
  },
  {
    title: 'Fullstack Direction',
    description: 'A portfolio structure designed to expand into flagship product work with React, TypeScript, dashboards, and business-oriented interfaces.',
  },
  {
    title: 'Professional Delivery',
    description: 'Every repository is planned to include setup instructions, environment variables, case studies, clear README structure, and deployment readiness.',
  },
]

const workflowPoints = [
  'Backend-first foundation so larger fullstack apps reuse proven patterns',
  'Documentation that helps recruiters scan quickly and engineers go deeper',
  'AI-assisted workflow used to accelerate iteration without replacing understanding',
]

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--color-border)] py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(110,240,255,0.16),_transparent_30%),radial-gradient(circle_at_82%_18%,_rgba(255,79,216,0.14),_transparent_24%),linear-gradient(180deg,rgba(8,12,25,0.5),rgba(8,12,25,0.1))]" />
        <Container>
          <motion.div
            className="relative grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-accent)]">
                Portfolio Ecosystem
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
                Building fullstack systems that are easy for recruiters and engineers to trust.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
                {siteConfig.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
                <span className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-2">
                  {siteConfig.location}
                </span>
                <span className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-4 py-2">
                  {siteConfig.availability}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/projects"
                  className="rounded-full border border-[var(--color-border-strong)] bg-[linear-gradient(90deg,rgba(110,240,255,0.18),rgba(255,79,216,0.16))] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] shadow-[0_0_28px_rgba(110,240,255,0.12)]"
                >
                  Explore Projects
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(19,26,53,0.82),rgba(10,15,32,0.96))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">Current focus</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{siteConfig.role}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ['2', 'backend proof projects completed'],
                  ['1', 'portfolio hub in active build'],
                  ['Next', 'fullstack flagship project: TaskFlow'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] p-4">
                    <p className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{value}</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="py-18 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What This Portfolio Proves"
            title="A hiring signal designed as a system, not a random collection of demos"
            description="The goal is to make skill evaluation easier. Each repository has a clear purpose, and the portfolio ties them together into one coherent engineering story."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {proofBlocks.map((block) => (
              <article key={block.title} className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(15,21,43,0.78),rgba(8,11,24,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
                <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">{block.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{block.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[color:rgba(6,10,23,0.62)] py-18 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Featured Projects"
            title="A portfolio built as a connected engineering system"
            description="Each project has a different hiring signal. Together they show backend depth, security knowledge, fullstack direction, and clear documentation habits."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Skills"
            title="Stack depth organized by what I actually build"
            description="I want recruiters to see not just a list of tools, but the technical areas I can deliver across backend APIs, frontend implementation, databases, documentation, and modern workflows."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <article key={group.title} className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(15,20,40,0.78),rgba(8,12,24,0.96))] p-6">
                <h3 className="text-lg font-semibold text-[var(--color-ink)]">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-3 py-1 text-sm text-[var(--color-muted)]">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[color:rgba(11,17,35,0.75)] py-18 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Working Style"
            title="I treat portfolio work like product work"
            description="That means small iterations, clean structure, readable README files, Dockerized setups where useful, and case studies that explain not only what I built, but what the project proves."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.78),rgba(8,12,24,0.96))] p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">How I build</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-muted)]">
                {workflowPoints.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,40,0.78),rgba(8,12,24,0.96))] p-7">
              <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">GitHub standards</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
                <li>• clear repository purpose and naming</li>
                <li>• setup instructions that actually work</li>
                <li>• documented environment variables and Docker flow</li>
                <li>• README sections for architecture, learning, and future improvements</li>
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[color:rgba(8,12,25,0.72)] py-18 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Notes"
            title="Technical writing that supports the code"
            description="The blog and notes section is where I turn implementation work into architecture explanations, workflow notes, and practical takeaways."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="py-18 sm:py-24">
        <Container>
          <div className="rounded-[2rem] border border-[var(--color-border-strong)] bg-[linear-gradient(135deg,rgba(10,18,38,0.96),rgba(24,11,49,0.92))] px-6 py-10 text-[var(--color-ink)] shadow-[0_0_40px_rgba(110,240,255,0.08)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Contact
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Open to Java, Spring Boot, React, and Fullstack opportunities.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  If you are hiring for backend or fullstack roles and want someone who cares about clean structure, professional documentation, and practical product delivery, I would be glad to connect.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[linear-gradient(90deg,rgba(110,240,255,0.18),rgba(255,79,216,0.16))] px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
                >
                  Email Me
                </a>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)]"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
