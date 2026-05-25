import { BlogCard } from '../components/blog/BlogCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { blogPosts } from '../data/blog-posts'

export function BlogPage() {
  return (
    <section className="py-18 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog And Notes"
          title="Architecture notes, backend lessons, and workflow reflections"
          description="This section is designed to support the repositories with written context. It turns code into explanation, and explanation into stronger hiring signal."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
