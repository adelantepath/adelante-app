import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Target, Users, TrendingUp, DollarSign, Home, Heart, Car, Briefcase, Scale, Clock, UserCheck, Sparkles, MessageCircle, Brain, Cpu, BarChart3, Share2, Award, CheckCircle2, Zap, Trophy, Flame, Play, Star } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

const coreCategories = [
  { icon: DollarSign, title: 'Money & Finance', description: 'Banking, credit, taxes, investing', color: 'from-violet-500 to-purple-600' },
  { icon: Home, title: 'Housing & Living', description: 'Renting, utilities, daily life', color: 'from-purple-500 to-fuchsia-600' },
  { icon: Heart, title: 'Health & Wellness', description: 'Insurance, self-care, mental health', color: 'from-pink-500 to-rose-600' },
  { icon: Car, title: 'Transportation', description: 'Driving, car ownership, insurance', color: 'from-blue-500 to-indigo-600' },
  { icon: Briefcase, title: 'Career & Education', description: 'Jobs, resumes, professional growth', color: 'from-emerald-500 to-teal-600' },
  { icon: Scale, title: 'Legal & Civic', description: 'Laws, voting, contracts', color: 'from-amber-500 to-orange-600' },
  { icon: Clock, title: 'Life Management', description: 'Time, goals, problem-solving', color: 'from-cyan-500 to-blue-600' },
  { icon: UserCheck, title: 'Relationships', description: 'Communication, boundaries, social skills', color: 'from-rose-500 to-pink-600' },
]

const professionalCategories = [
  { icon: TrendingUp, title: 'Sales & Business', description: 'Persuasion, negotiation, entrepreneurship', color: 'from-violet-600 to-purple-700' },
  { icon: Share2, title: 'Digital Marketing', description: 'Personal branding, social media, content', color: 'from-pink-600 to-rose-700' },
  { icon: Cpu, title: 'Technology & AI', description: 'AI tools, tech literacy, digital skills', color: 'from-sky-500 to-blue-600' },
  { icon: BarChart3, title: 'Data & Analytics', description: 'Spreadsheets, data literacy, insights', color: 'from-emerald-600 to-teal-700' },
  { icon: MessageCircle, title: 'Communication', description: 'Presentations, writing, speaking', color: 'from-amber-500 to-yellow-600' },
  { icon: Brain, title: 'Emotional Intelligence', description: 'Self-awareness, empathy, leadership', color: 'from-fuchsia-500 to-pink-600' },
  { icon: Award, title: 'Career Skills', description: 'Certifications, paths, industry knowledge', color: 'from-indigo-600 to-violet-700' },
]

const stages = [
  { title: 'Elementary to Middle', age: '10-12', description: 'Building independence, study habits, and social awareness', emoji: '🎒' },
  { title: 'Middle to High School', age: '13-15', description: 'Identity, responsibility, digital citizenship, future planning', emoji: '📚' },
  { title: 'High School to Adult', age: '16-21', description: 'Real-world mastery: finances, career, taxes, independence', emoji: '🎓' },
]

const features = [
  { title: 'Interactive Lessons', description: 'Learn through engaging content designed for your age group', icon: BookOpen },
  { title: 'Real Simulations', description: 'Practice budgeting, taxes, and life decisions safely', icon: Target },
  { title: 'AI Life Coach', description: 'Get personalized guidance on any life question', icon: MessageCircle },
  { title: 'Progress Tracking', description: 'Earn XP, badges, and climb the leaderboard', icon: Trophy },
]

const stats = [
  { value: '10K+', label: 'Active Learners' },
  { value: '500+', label: 'Lessons Available' },
  { value: '50+', label: 'Life Simulations' },
  { value: '95%', label: 'Completion Rate' },
]

async function getUser() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    return data?.user || null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const user = await getUser()

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="Adelante Pathways" width={40} height={40} className="rounded-xl shadow-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Adelante</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#pathways" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pathways</Link>
              <Link href="#skills" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Skills</Link>
              <Link href="#organizations" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Schools</Link>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg">
                  <Link href="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild className="hidden sm:inline-flex">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg">
                    <Link href="/auth/sign-up">Get Started Free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-violet-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-300/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Life Skills Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Learn real life{' '}
                <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  before it hits you
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                The life-stage operating system that prepares first-generation students and families 
                for every transition from middle school to adulthood.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="h-14 px-8 text-base bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25">
                  <Link href="/auth/sign-up">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base border-2">
                  <Link href="#features">
                    <Play className="mr-2 h-4 w-4" />
                    See How It Works
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Loved by 10,000+ learners</p>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8 hidden lg:block">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-lg font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold">Welcome back, Jordan!</p>
                      <div className="flex items-center gap-1 text-sm text-white/80">
                        <Flame className="h-4 w-4 text-orange-300" />
                        <span>9 day streak - Keep it going!</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-600 font-bold">
                      <Zap className="h-4 w-4" />
                      1,320
                    </div>
                    <p className="text-xs text-muted-foreground">XP Earned</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-purple-600 font-bold">
                      <Trophy className="h-4 w-4" />
                      Trainee
                    </div>
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold">
                      <Target className="h-4 w-4" />
                      #10
                    </div>
                    <p className="text-xs text-muted-foreground">Rank</p>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Understanding Credit</p>
                        <p className="text-sm text-muted-foreground">67% complete</p>
                      </div>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Lesson Complete!</p>
                    <p className="text-xs text-muted-foreground">+50 XP</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-border">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Badge Earned!</p>
                    <p className="text-xs text-muted-foreground">Budget Master</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
            &quot;Our parents did the best they could. They had to figure things out as they went. 
            This platform is meant to help fill those gaps - giving the next generation a head start 
            so they feel more prepared than we did.&quot;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600" />
            <div className="text-left">
              <p className="font-semibold">Adelante Pathways</p>
              <p className="text-sm text-muted-foreground">Founder&apos;s Vision</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Succeed in Life
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete system for learning life skills through lessons, simulations, and AI coaching
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 border-transparent hover:border-purple-200 bg-white hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pathways" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pathways for Every{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Life Transition
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Age-appropriate content that grows with you from middle school to full independence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stages.map((stage) => (
              <Card key={stage.title} className="relative overflow-hidden hover:shadow-xl transition-all group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-violet-600" />
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{stage.emoji}</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                    Ages {stage.age}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{stage.title}</h3>
                  <p className="text-muted-foreground mb-4">{stage.description}</p>
                  <Button variant="ghost" className="p-0 h-auto text-purple-600 group-hover:translate-x-1 transition-transform">
                    Explore curriculum <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Master Essential{' '}
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Life Skills
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive modules covering everything school never taught you
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {coreCategories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-200">
                <CardContent className="p-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Professional Skills for Success
              </span>
            </h3>
            <p className="text-muted-foreground">Build competitive advantages with in-demand career skills</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {professionalCategories.map((category) => (
              <Card key={category.title} className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-200">
                <CardContent className="p-6">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="organizations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Users className="h-4 w-4" />
                For Schools & Organizations
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Partner With{' '}
                <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                  Adelante Pathways
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Bring life skills education to your school, nonprofit, or community program. 
                We provide institutional dashboards, progress tracking, and curriculum support.
              </p>
              <div className="space-y-4 mb-8">
                {['Custom organization dashboard', 'Student progress tracking & reports', 'Curriculum aligned to your needs', 'Dedicated support team'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Organization Dashboard</h3>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">Live</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">247</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-4 bg-violet-50 rounded-lg">
                    <p className="text-2xl font-bold text-violet-600">89%</p>
                    <p className="text-sm text-muted-foreground">Completion</p>
                  </div>
                  <div className="text-center p-4 bg-fuchsia-50 rounded-lg">
                    <p className="text-2xl font-bold text-fuchsia-600">4.8</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Financial Literacy', 'Career Readiness', 'Life Management'].map((course, i) => (
                    <div key={course} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{course}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-purple-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full" style={{ width: `${85 - i * 15}%` }} />
                        </div>
                        <span className="text-sm text-muted-foreground">{85 - i * 15}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Move Forward?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of learners building the skills they need for real-world success. 
            Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="h-14 px-10 text-base bg-white text-purple-600 hover:bg-gray-100 shadow-lg">
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-10 text-base border-2 border-white text-white hover:bg-white/10">
              <Link href="#organizations">
                For Organizations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.jpg" alt="Adelante Pathways" width={40} height={40} className="rounded-xl" />
                <span className="text-xl font-bold">Adelante</span>
              </div>
              <p className="text-gray-400">Learn real life before it hits you. Preparing the next generation for success.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-gray-400">
                <p><Link href="#features" className="hover:text-white transition-colors">Features</Link></p>
                <p><Link href="#pathways" className="hover:text-white transition-colors">Life Stages</Link></p>
                <p><Link href="#skills" className="hover:text-white transition-colors">Skills</Link></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <p><Link href="#organizations" className="hover:text-white transition-colors">For Organizations</Link></p>
                <p><Link href="/support" className="hover:text-white transition-colors">Support</Link></p>
                <p><Link href="/ai-coach" className="hover:text-white transition-colors">AI Coach</Link></p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <p><Link href="#" className="hover:text-white transition-colors">About Us</Link></p>
                <p><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></p>
                <p><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Adelante Pathways. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
