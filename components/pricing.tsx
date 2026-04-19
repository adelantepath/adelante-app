import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with essential life skills",
    features: [
      "Basic transition checklists",
      "3 beginner simulations",
      "Elementary stage modules",
      "Progress tracking",
      "Community access"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Full access for serious preparation",
    features: [
      "All transition stages",
      "Unlimited simulations",
      "Advanced consequence engine",
      "Parent dashboard",
      "Custom learning paths",
      "Priority support",
      "Family sharing (up to 3)"
    ],
    cta: "Start 7-Day Trial",
    popular: true
  },
  {
    name: "Family",
    price: "$19",
    period: "per month",
    description: "For families with multiple children",
    features: [
      "Everything in Pro",
      "Up to 6 family members",
      "Individual progress tracking",
      "Parent control panel",
      "Customizable milestones",
      "1-on-1 onboarding call",
      "Early access to new features"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Invest in their future
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                "bg-card border-2 border-border relative rounded-2xl",
                plan.popular && "border-accent shadow-xl shadow-accent/10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="size-3 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={cn(
                    "w-full rounded-xl",
                    plan.popular 
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20" 
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
