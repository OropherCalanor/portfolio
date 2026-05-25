type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--color-muted)] sm:text-lg">{description}</p>
    </div>
  )
}
