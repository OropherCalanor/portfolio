type TagListProps = {
  items: string[]
}

export function TagList({ items }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[var(--color-border)] bg-[color:rgba(255,255,255,0.03)] px-3 py-1 text-xs font-medium text-[var(--color-muted)] backdrop-blur"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
