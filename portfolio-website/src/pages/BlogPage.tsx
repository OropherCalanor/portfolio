import { BlogCard } from '../components/blog/BlogCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { blogPosts } from '../data/blog-posts'

const focusAreas = [
  'Spring architecture and backend implementation notes',
  'Security and authentication lessons from real portfolio projects',
  'AI-assisted development workflow reflections',
  'Python automation and cross-stack growth experiments',
]

export function BlogPage() {
  return (
    <section className="py-18 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog And Notes"
          title="Architecture notes, backend lessons, and workflow reflections"
          description="This section supports the repositories with written context. It turns code into explanation, roadmap choices into visible reasoning, and implementation work into a stronger hiring signal."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(15,21,43,0.78),rgba(8,11,24,0.96))] p-7">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Why this section exists</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              I want the portfolio to show not only what I built, but how I think about architecture, security,
              documentation quality, and the way different technologies fit into one coherent roadmap.
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
              {focusAreas.map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(15,21,43,0.78),rgba(8,11,24,0.96))] p-7">
            <h3 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Current writing direction</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                [String(blogPosts.length), 'published notes'],
                ['Java + React', 'primary build track'],
                ['Python', 'complementary exploration lane'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] p-4">
                  <p className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">{value}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
