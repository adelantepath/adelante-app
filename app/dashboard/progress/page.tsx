import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Flame, Trophy, BookOpen, Gamepad2, GraduationCap } from 'lucide-react'

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user stats
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user?.id)
    .single()

  // Fetch lesson completions
  const { data: completions } = await supabase
    .from('lesson_completions')
    .select('*, lessons(title, modules(title, courses(title)))')
    .eq('user_id', user?.id)
    .order('completed_at', { ascending: false })
    .limit(10)

  // Fetch simulation results
  const { data: simResults } = await supabase
    .from('simulation_results')
    .select('*, simulations(title)')
    .eq('user_id', user?.id)
    .order('completed_at', { ascending: false })
    .limit(10)

  const currentStreak = stats?.current_streak || 0
  const longestStreak = stats?.longest_streak || 0
  const totalXP = stats?.total_xp || 0
  const coursesCompleted = stats?.courses_completed || 0
  const simulationsCompleted = stats?.simulations_completed || 0
  const lessonsCompleted = stats?.lessons_completed || 0

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Progress</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Flame className="size-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Trophy className="size-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalXP}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <Flame className="size-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{lessonsCompleted}</p>
                <p className="text-sm text-muted-foreground">Lessons Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="size-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{coursesCompleted}</p>
                <p className="text-sm text-muted-foreground">Courses Done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Gamepad2 className="size-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{simulationsCompleted}</p>
                <p className="text-sm text-muted-foreground">Simulations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Lessons</CardTitle>
            <CardDescription>Your latest completed lessons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completions && completions.length > 0 ? (
              completions.map((completion) => (
                <div key={completion.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="size-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {completion.lessons?.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {completion.lessons?.modules?.courses?.title}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    +{completion.xp_earned || 10} XP
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No lessons completed yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Simulations</CardTitle>
            <CardDescription>Your latest simulation results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {simResults && simResults.length > 0 ? (
              simResults.map((result) => (
                <div key={result.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                  <div className="size-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="size-5 text-chart-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {result.simulations?.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={result.score || 0} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{result.score}%</span>
                    </div>
                  </div>
                  <Badge variant={result.score >= 80 ? "default" : "secondary"} className="flex-shrink-0">
                    {result.score >= 80 ? 'Pass' : 'Try Again'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Gamepad2 className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No simulations completed yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
