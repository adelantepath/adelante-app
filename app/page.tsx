import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Target, Users, TrendingUp, DollarSign, Home, Heart, Car, Briefcase, Scale, Clock, UserCheck, Sparkles, MessageCircle, Brain, Cpu, BarChart3, Share2, Award } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const coreCategories = [
  { icon: DollarSign, title: 'Money & Finance', description: 'Banking, credit, taxes, investing', color: 'bg-violet-500' },
  { icon: Home, title: 'Housing & Living', description: 'Renting, utilities, daily life', color: 'bg-purple-500' },
  { icon: Heart, title: 'Health & Wellness', description: 'Insurance, self-care, mental health', color: 'bg-fuchsia-500' },
  { icon: Car, title: 'Transportation', description: 'Driving, car ownership, insurance', color: 'bg-violet-600' },
  { icon: Briefcase, title: 'Career & Education', description: 'Jobs, resumes, professional growth', color: 'bg-purple-600' },
  { icon: Scale, title: 'Legal & Civic', description: 'Laws, voting, contracts', color: 'bg-indigo-500' },
  { icon: Clock, title: 'Life Management', description: 'Time, goals, problem-solving', color: 'bg-violet-700' },
  { icon: UserCheck, title: 'Relationships', description: 'Communication, boundaries, social skills', color: 'bg-purple-700' },
]

const professionalCategories = [
  { icon: TrendingUp, title: 'Sales & Entrepreneurship', description: 'Persuasion, negotiation, starting a business', color: 'bg-violet-600' },
  { icon: Share2, title: 'Digital Marketing', description: 'Personal branding, social media, content', color: 'bg-pink-600' },
  { icon: Cpu, title: 'Technology & AI', description: 'AI tools, tech literacy, digital skills', color: 'bg-sky-500' },
  { icon: BarChart3, title: 'Data & Analytics', description: 'Spreadsheets, data literacy, decision-making', color: 'bg-emerald-600' },
  { icon: MessageCircle, title: 'Communication', description: 'Presentations, writing, professional speaking', color: 'bg-amber-500' },
  { icon: Brain, title: 'Emotional Intelligence', description: 'Self-awareness, empathy, social skills', color: 'bg-pink-500' },
  { icon: Award, title: 'Job-Specific Skills', description: 'Certifications, career paths, industry knowledge', color: 'bg-indigo-600' },
]

const stages = [
  { title: 'Elementary to Middle', age: '10-12', description: 'Building independence and study habits' },
  { title: 'Middle to High School', age: '13-15', description: 'Identity, responsibility, future planning' },
  { title: 'High School to Adult', age: '16-21', description: 'Real-world readiness: finances, career, life' },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="Adelante Pathways" width={40} height={40} className="rounded-lg" />
              <span className="text-2xl font-bold text-primary">Adelante</span>
            </Link>
            <div className="flex items-center gap-4">
              {user ? (
                <Button asChild>
                  <Link href="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-violet-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Life Skills Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Learn real life{' '}
              <span className="text-primary">before it hits you</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Adelante Pathways prepares first-generation students and families for life transitions 
              with practical skills in money, housing, career, taxes, and more. Your bridge to real-world readiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link href="/auth/sign-up">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base">
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-muted-foreground italic">
            &quot;Our parents did the best they could. They had to figure things out as they went. 
            This platform is meant to help fill those gaps - giving the next generation a head start 
            so they feel more prepared than we did.&quot;
          </p>
        </div>
      </section>

      {/* Life Stages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pathways for Every Transition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From middle school to adulthood, we guide learners through each critical life stage
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, index) => (
              <Card key={stage.title} className="relative overflow-hidden group hover:shadow-lg transition-shadow border-border">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Ages {stage.age}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                  <p className="text-muted-foreground">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Life Skills Categories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Essential Life Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master the fundamentals school never taught you
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreCategories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
                <CardContent className="p-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color} text-white mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Skills Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional Skills for Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build competitive advantages with in-demand career skills
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {professionalCategories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
                <CardContent className="p-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.color} text-white mb-4`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Adelante Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn by doing, not just reading. Our approach combines content with real-world simulations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn the Concepts</h3>
              <p className="text-muted-foreground">
                Short, focused lessons explain real-world systems in simple terms. No jargon, just clarity.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice with Simulations</h3>
              <p className="text-muted-foreground">
                AI-powered scenarios let you make real decisions and see consequences before they happen in life.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-muted-foreground">
                See your growth, earn achievements, and build confidence as you master each life skill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                For Schools & Organizations
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Adelante partners with schools, nonprofits, and community programs to bring life-skills 
                education at scale. Get dashboards, progress tracking, and curriculum integration.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-3 w-3 text-primary" />
                  </div>
                  <span>Manage student cohorts and track progress</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="h-3 w-3 text-primary" />
                  </div>
                  <span>Customize learning paths for your needs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 text-primary" />
                  </div>
                  <span>Analytics and reporting for educators</span>
                </li>
              </ul>
              <Button size="lg">
                Partner With Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Active Students</span>
                  <span className="text-2xl font-bold text-primary">2,847</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Lessons Completed</span>
                  <span className="text-2xl font-bold text-primary">18,392</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-medium">Average Completion</span>
                  <span className="text-2xl font-bold text-primary">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to prepare for real life?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of learners building essential life skills. Free to start, powerful to master.
          </p>
          <Button size="lg" variant="secondary" asChild className="h-12 px-8 text-base">
            <Link href="/auth/sign-up">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="Adelante Pathways" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold text-white">Adelante Pathways</span>
            </div>
            <p className="text-sm">Learn real life before it hits you.</p>
            <p className="text-sm">2024 Adelante Pathways. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
