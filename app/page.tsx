import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LifeStages } from "@/components/life-stages"
import { Simulations } from "@/components/simulations"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <LifeStages />
      <Simulations />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
