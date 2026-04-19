'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { 
  DollarSign, 
  Home, 
  Briefcase, 
  CreditCard, 
  PiggyBank,
  TrendingUp,
  FileText,
  Car,
  Play,
  Lock,
  CheckCircle2
} from 'lucide-react'
import type { Simulation } from '@/lib/types'

const simulationIcons: Record<string, React.ElementType> = {
  budget: DollarSign,
  rent: Home,
  job: Briefcase,
  credit: CreditCard,
  savings: PiggyBank,
  investing: TrendingUp,
  taxes: FileText,
  car: Car,
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediate: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  advanced: 'bg-red-500/10 text-red-600 border-red-500/20',
}

export default function SimulationsPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([])
  const [completedSimulations, setCompletedSimulations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSimulations() {
      const supabase = createClient()
      
      // Get user
      const { data: { user } } = await supabase.auth.getUser()
      
      // Get all simulations
      const { data: sims } = await supabase
        .from('simulations')
        .select('*')
        .order('order_index')
      
      if (sims) setSimulations(sims)

      // Get completed simulations for user
      if (user) {
        const { data: completed } = await supabase
          .from('simulation_results')
          .select('simulation_id')
          .eq('user_id', user.id)
        
        if (completed) {
          setCompletedSimulations(completed.map(c => c.simulation_id))
        }
      }

      setLoading(false)
    }

    fetchSimulations()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const completedCount = completedSimulations.length
  const totalCount = simulations.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Life Simulations</h1>
        <p className="text-muted-foreground mt-1">
          Practice real-world decisions in a safe environment. See the consequences before they happen in life.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} simulations completed
              </p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(progressPercent)}%
            </div>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Simulation Categories */}
      <div className="grid gap-6">
        {/* Budget & Money */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Money Management
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulations
              .filter(s => s.category === 'money')
              .map((sim) => (
                <SimulationCard
                  key={sim.id}
                  simulation={sim}
                  isCompleted={completedSimulations.includes(sim.id)}
                />
              ))}
            {simulations.filter(s => s.category === 'money').length === 0 && (
              <PlaceholderCard title="Monthly Budget Challenge" description="Manage a real monthly budget with income and expenses" />
            )}
          </div>
        </div>

        {/* Housing */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Housing & Living
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulations
              .filter(s => s.category === 'housing')
              .map((sim) => (
                <SimulationCard
                  key={sim.id}
                  simulation={sim}
                  isCompleted={completedSimulations.includes(sim.id)}
                />
              ))}
            {simulations.filter(s => s.category === 'housing').length === 0 && (
              <PlaceholderCard title="First Apartment" description="Navigate finding and renting your first place" />
            )}
          </div>
        </div>

        {/* Career */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Career & Income
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulations
              .filter(s => s.category === 'career')
              .map((sim) => (
                <SimulationCard
                  key={sim.id}
                  simulation={sim}
                  isCompleted={completedSimulations.includes(sim.id)}
                />
              ))}
            {simulations.filter(s => s.category === 'career').length === 0 && (
              <PlaceholderCard title="Job Interview Prep" description="Practice answering common interview questions" />
            )}
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-center">
        <h3 className="text-xl font-semibold mb-2">More Simulations Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We are building more real-world scenarios including taxes, investing, 
          emergency situations, and relationship challenges.
        </p>
      </div>
    </div>
  )
}

function SimulationCard({ simulation, isCompleted }: { simulation: Simulation; isCompleted: boolean }) {
  const Icon = simulationIcons[simulation.type] || DollarSign
  const difficultyClass = difficultyColors[simulation.difficulty] || difficultyColors.beginner

  return (
    <Card className={`group hover:shadow-lg transition-all border-border ${isCompleted ? 'bg-primary/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary`}>
            <Icon className="h-5 w-5" />
          </div>
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
        <CardTitle className="text-lg mt-3">{simulation.title}</CardTitle>
        <CardDescription className="line-clamp-2">{simulation.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className={difficultyClass}>
            {simulation.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ~{simulation.estimated_time} min
          </span>
        </div>
        <Button asChild className="w-full" variant={isCompleted ? 'outline' : 'default'}>
          <Link href={`/simulations/${simulation.slug}`}>
            <Play className="h-4 w-4 mr-2" />
            {isCompleted ? 'Play Again' : 'Start Simulation'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function PlaceholderCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="border-dashed border-border opacity-60">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Lock className="h-5 w-5" />
          </div>
        </div>
        <CardTitle className="text-lg mt-3">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Badge variant="outline" className="bg-muted/50">Coming Soon</Badge>
      </CardContent>
    </Card>
  )
}
