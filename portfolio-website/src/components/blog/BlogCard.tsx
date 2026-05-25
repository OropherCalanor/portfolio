import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/content'

type BlogCardProps = {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(14,20,39,0.78),rgba(8,12,24,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
        <span>{post.publishedAt}</span>
        <span>{post.readingTime}</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{post.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,79,216,0.08)] px-3 py-1 text-xs font-medium text-[var(--color-accent-secondary)]">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-accent)]">
        Read note
      </Link>
    </article>
  )
}
