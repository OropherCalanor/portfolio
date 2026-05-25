import { ProjectCard } from '../components/projects/ProjectCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { projects } from '../data/projects'

export function ProjectsPage() {
  return (
    <section className="py-18 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Repositories built to prove specific engineering strengths"
          description="This portfolio is designed as an ecosystem. Some projects are already completed and deployed locally with tests and Docker support, while others are planned as the next fullstack and AI-focused proof layers."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
