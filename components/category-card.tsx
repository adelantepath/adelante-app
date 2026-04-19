interface CategoryCardProps {
  emoji: string
  title: string
  description: string
}

export function CategoryCard({ emoji, title, description }: CategoryCardProps) {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius)] p-6 hover:shadow-md transition-shadow cursor-pointer border border-[var(--border)]">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
    </div>
  )
}
