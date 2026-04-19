"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Now in beta</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Prepare for{" "}
              <span className="text-accent">real life</span>
              {" "}before it hits
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The guided system that prepares young people for life&apos;s biggest transitions through action, simulations, and real-world experience. Not lectures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 rounded-xl shadow-lg shadow-accent/20">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="size-4" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3 justify-center lg:justify-start flex-wrap">
              <div className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-sm text-accent font-medium">Financial Literacy</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-secondary border border-border">
                <span className="text-sm text-muted-foreground">Life Skills</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-secondary border border-border">
                <span className="text-sm text-muted-foreground">Career Prep</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-card rounded-3xl border-2 border-border shadow-xl p-6 lg:p-8">
              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                Live Simulation
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-secondary flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Budget Challenge</p>
                    <p className="text-sm text-muted-foreground">Monthly income: $3,200</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rent</span>
                    <span className="font-medium text-foreground">$1,200</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[37.5%] bg-accent rounded-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Groceries</span>
                    <span className="font-medium text-foreground">$400</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[12.5%] bg-chart-3 rounded-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-medium text-accent">$1,600</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[50%] bg-accent rounded-full" />
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                  Make Next Decision
                </Button>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl border border-border shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Credit Score</p>
                  <p className="text-xs text-accent">+45 points this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
