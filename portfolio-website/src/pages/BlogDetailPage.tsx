import { Navigate, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { blogPosts } from '../data/blog-posts'

export function BlogDetailPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <section className="py-18 sm:py-24">
      <Container>
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span>{post.publishedAt}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">{post.summary}</p>

          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[var(--color-panel)] px-3 py-1 text-sm text-[var(--color-accent)]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 space-y-6 text-base leading-8 text-[var(--color-muted)]">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </Container>
    </section>
  )
}
