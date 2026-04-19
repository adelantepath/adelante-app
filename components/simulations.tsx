"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"

const simulations = [
  {
    title: "Monthly Budget Challenge",
    description: "Manage a $3,200 monthly income. Pay bills, save money, handle emergencies.",
    difficulty: "Ages 16+",
    duration: "15 min",
    tags: ["Money", "Planning"],
    preview: {
      scenario: "Your car broke down. Repair cost: $800",
      options: ["Use emergency fund", "Put on credit card", "Skip this month"]
    }
  },
  {
    title: "First Job Interview",
    description: "Practice answering common interview questions and making a great first impression.",
    difficulty: "Ages 14+",
    duration: "10 min",
    tags: ["Career", "Communication"],
    preview: {
      scenario: "Tell me about yourself...",
      options: ["Talk about hobbies", "Highlight skills", "Share your goals"]
    }
  },
  {
    title: "Credit Score Journey",
    description: "Start at 650. Make decisions over 12 simulated months. Watch your score change.",
    difficulty: "Ages 16+",
    duration: "25 min",
    tags: ["Credit", "Banking"],
    preview: {
      scenario: "Credit card bill due: $500. Balance: $400",
      options: ["Pay minimum ($25)", "Pay full amount", "Pay what you can"]
    }
  },
  {
    title: "School Schedule Planner",
    description: "Balance homework, activities, and free time. Learn to prioritize what matters.",
    difficulty: "Ages 10-14",
    duration: "10 min",
    tags: ["Time", "Organization"],
    preview: {
      scenario: "You have a test tomorrow and practice tonight.",
      options: ["Study after practice", "Skip practice", "Study during lunch"]
    }
  }
]

export function Simulations() {
  return (
    <section id="simulations" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Experience consequences. Without the consequences.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our simulations let you make real decisions with fake stakes. Learn from mistakes before they cost you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {simulations.map((sim) => (
            <Card key={sim.title} className="bg-card border-border group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    {sim.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{sim.difficulty}</span>
                </div>
                <CardTitle className="text-xl">{sim.title}</CardTitle>
                <CardDescription>{sim.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-secondary/50 border border-border mb-4">
                  <p className="text-sm font-medium text-foreground mb-3">
                    {sim.preview.scenario}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sim.preview.options.map((option) => (
                      <button
                        key={option}
                        className="px-3 py-1.5 text-xs rounded-lg bg-card border border-border hover:border-accent/50 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:text-accent transition-colors">
                  Start Simulation
                  <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <TrendingDown className="size-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Late Payment</p>
                  <p className="text-xs text-muted-foreground">Consequence activated</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Credit score dropped 45 points. Learn why payment timing matters.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                  <AlertTriangle className="size-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Missed Deadline</p>
                  <p className="text-xs text-muted-foreground">Scenario challenge</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Assignment submitted late. Discover how planning ahead prevents stress.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="size-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Smart Choices</p>
                  <p className="text-xs text-muted-foreground">Goal achieved</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Built good habits early. Skills compound over time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
