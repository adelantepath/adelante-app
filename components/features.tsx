import { Card, CardContent } from "@/components/ui/card"
import { 
  Gamepad2, 
  ListChecks, 
  BarChart3, 
  Users, 
  Zap,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Gamepad2,
    title: "Real-Life Simulations",
    description: "Pay rent, file taxes, manage a budget with fake money. Experience consequences without the real risk."
  },
  {
    icon: ListChecks,
    title: "Dynamic Checklists",
    description: "Unlock tasks based on age and stage. Both parents and kids can track progress together."
  },
  {
    icon: BarChart3,
    title: "Consequence Engine",
    description: "Late payment? Credit drops. No savings? Emergency fails. Learn cause and effect safely."
  },
  {
    icon: Users,
    title: "Parent Dashboard",
    description: "Assign responsibilities, track completion, and gradually release control as your child grows."
  },
  {
    icon: Zap,
    title: "Micro-Learning",
    description: "30-60 second lessons followed by immediate action. Like TikTok, but for life skills."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Make mistakes, learn lessons, and build confidence—all before facing real-world stakes."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Not lectures. Not information dumps.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Action + exposure + repetition. That&apos;s how real learning happens.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card border-2 border-border rounded-2xl hover:border-accent/50 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="size-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
