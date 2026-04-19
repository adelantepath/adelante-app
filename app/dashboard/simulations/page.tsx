import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Clock, ArrowRight, Trophy } from 'lucide-react'
import Link from 'next/link'

export default async function SimulationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch standalone simulations
  const { data: simulations } = await supabase
    .from('simulations')
    .select('*')
    .eq('is_standalone', true)
    .order('created_at', { ascending: false })

  // Fetch user's simulation results
  const { data: results } = await supabase
    .from('simulation_results')
    .select('simulation_id, score, completed_at')
    .eq('user_id', user?.id)

  const resultsBySimulation = results?.reduce((acc, r) => {
    acc[r.simulation_id] = r
    return acc
  }, {} as Record<string, typeof results[0]>) || {}

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Simulations</h1>
        <p className="text-muted-foreground mt-1">
          Practice real-world scenarios in a safe environment
        </p>
      </div>

      {/* Simulations Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {simulations && simulations.length > 0 ? (
          simulations.map((sim) => {
            const result = resultsBySimulation[sim.id]
            const isCompleted = !!result

            return (
              <Card key={sim.id} className="bg-card border-border group hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={
                      sim.difficulty === 'beginner' ? 'secondary' :
                      sim.difficulty === 'intermediate' ? 'default' : 'destructive'
                    } className="text-xs">
                      {sim.difficulty}
                    </Badge>
                    {isCompleted && (
                      <div className="flex items-center gap-1 text-accent">
                        <Trophy className="size-4" />
                        <span className="text-sm font-medium">{result.score}%</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {sim.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {sim.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="size-4" />
                      <span>{sim.estimated_time || '15 min'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gamepad2 className="size-4" />
                      <span>{sim.type || 'Interactive'}</span>
                    </div>
                  </div>
                  <Button 
                    className={isCompleted 
                      ? "w-full" 
                      : "w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    }
                    variant={isCompleted ? "outline" : "default"}
                    asChild
                  >
                    <Link href={`/dashboard/simulations/${sim.id}`}>
                      {isCompleted ? 'Play Again' : 'Start Simulation'}
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full">
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Gamepad2 className="size-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No simulations available yet</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  We&apos;re building interactive simulations. Check back soon!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
