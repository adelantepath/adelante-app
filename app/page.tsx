import { CategoryCard } from "@/components/category-card"

const categories = [
  {
    emoji: "💰",
    title: "Money",
    description: "Banking, credit, saving",
  },
  {
    emoji: "🏠",
    title: "Living",
    description: "Rent, housing, bills",
  },
  {
    emoji: "🚗",
    title: "Transportation",
    description: "License, cars, tickets",
  },
  {
    emoji: "📄",
    title: "Real Life Systems",
    description: "Taxes, IRS, documents",
  },
  {
    emoji: "🎓",
    title: "Next Steps",
    description: "College, jobs, trade school",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-2">
            Adelante
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg">
            Learn real life before it hits you.
          </p>
        </header>

        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-[var(--foreground)] mb-6">
            What do you want to learn?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                emoji={category.emoji}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
