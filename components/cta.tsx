import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-accent p-8 md:p-16 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground text-balance">
              Don&apos;t let real life be their first teacher
            </h2>
            <p className="mt-4 text-lg text-accent-foreground/80">
              Start preparing your child for the future today. It&apos;s free to begin—and the lessons last a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Button 
                size="lg" 
                className="bg-white hover:bg-white/90 text-accent gap-2 rounded-xl shadow-lg font-semibold"
              >
                Get Started Free
                <ArrowRight className="size-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground rounded-xl"
              >
                Talk to Our Team
              </Button>
            </div>

            <p className="mt-6 text-sm text-accent-foreground/60">
              No credit card required. Start with the free plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
