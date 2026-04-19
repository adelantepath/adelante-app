import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Gamepad2, Trophy, Flame, Star, Calendar, TrendingUp, Play } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Fetch user stats
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user?.id)
    .single()

  // Fetch recent achievements
  const { data: recentAchievements } = await supabase
    .from('user_achievements')
    .select('*, achievements(*)')
    .eq('user_id', user?.id)
    .order('earned_at', { ascending: false })
    .limit(3)

  // Fetch available courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*, course_categories(name)')
    .eq('is_published', true)
    .limit(4)

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Student'
  const currentStreak = stats?.current_streak || 0
  const totalXP = stats?.total_xp || 0
  const coursesCompleted = stats?.courses_completed || 0
  const simulationsCompleted = stats?.simulations_completed || 0
  
  // Calculate level from XP (every 500 XP = 1 level)
  const level = Math.floor(totalXP / 500) + 1
  const xpToNextLevel = 500 - (totalXP % 500)
  const levelProgress = ((totalXP % 500) / 500) * 100

  // Get level title based on level
  const getLevelTitle = (lvl: number) => {
    if (lvl <= 2) return 'Beginner'
    if (lvl <= 5) return 'Trainee'
    if (lvl <= 10) return 'Explorer'
    if (lvl <= 20) return 'Achiever'
    return 'Master'
  }

  return (
    <div className="space-y-8 pt-16 pb-8">
      {/* Welcome Header with Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Hello {displayName}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentStreak > 0 
              ? `Keep the ${currentStreak}-day streak going!`
              : 'Start your learning journey today!'
            }
          </p>
        </div>
        {currentStreak > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/10 border-2 border-accent/20">
            <Flame className="size-5 text-accent" />
            <span className="font-semibold text-accent">{currentStreak} Day Streak</span>
          </div>
        )}
      </div>

      {/* Stats Cards - Matching reference design */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-3">
                <Star className="size-7 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalXP.toLocaleString()} XP</p>
              <p className="text-sm text-muted-foreground">Current XP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                <TrendingUp className="size-7 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{getLevelTitle(level)}</p>
              <p className="text-sm text-muted-foreground">Level {level}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="size-14 rounded-2xl bg-chart-3/10 flex items-center justify-center mb-3">
                <Flame className="size-7 text-chart-3" />
              </div>
              <p className="text-2xl font-bold text-foreground">{currentStreak} Days</p>
              <p className="text-sm text-muted-foreground">Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className="size-14 rounded-2xl bg-chart-4/10 flex items-center justify-center mb-3">
                <Trophy className="size-7 text-chart-4" />
              </div>
              <p className="text-2xl font-bold text-foreground">#{Math.max(1, 100 - level * 5)}</p>
              <p className="text-sm text-muted-foreground">Rank</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress Card - Main focus area */}
      <Card className="rounded-2xl border-2 border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/dashboard/courses">
              View All <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses && courses.length > 0 ? (
            courses.slice(0, 2).map((course) => (
              <div key={course.id} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border-2 border-border">
                <div className="size-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Play className="size-8 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{course.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">Module 1 of {course.module_count || 5}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Module Progress</span>
                      <span className="text-foreground font-medium">0% completed</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-accent">+{course.xp_reward || 100} XP on completion</p>
                  </div>
                </div>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl" asChild>
                  <Link href={`/dashboard/courses/${course.id}`}>Continue</Link>
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 rounded-2xl bg-secondary/30 border-2 border-dashed border-border">
              <BookOpen className="size-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No courses available yet</p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl" asChild>
                <Link href="/dashboard/courses">Browse Courses</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Challenge */}
        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Challenge</CardTitle>
              <CardDescription>Test your skills & earn +50 XP!</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/dashboard/simulations">
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="size-8 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Budget Challenge</p>
                  <p className="text-sm text-muted-foreground">Make smart financial decisions</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl" asChild>
                <Link href="/dashboard/simulations">Start Challenge</Link>
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Updated daily - Skipping resets streak
            </p>
          </CardContent>
        </Card>

        {/* Learning Efficiency / Recent Achievements */}
        <Card className="rounded-2xl border-2 border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAchievements && recentAchievements.length > 0 ? (
              recentAchievements.map((ua) => (
                <div key={ua.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <div className="size-10 rounded-xl bg-chart-3/10 flex items-center justify-center flex-shrink-0 text-xl">
                    {ua.achievements?.icon || '🏆'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{ua.achievements?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{ua.achievements?.description}</p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">{ua.achievements?.xp_reward} XP</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Trophy className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Complete courses and simulations to earn achievements!</p>
              </div>
            )}
            <Button variant="outline" className="w-full rounded-xl" asChild>
              <Link href="/dashboard/achievements">
                View All Achievements
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl border-2 border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into a learning activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 rounded-2xl border-2 hover:border-accent hover:bg-accent/5" asChild>
              <Link href="/dashboard/simulations">
                <Gamepad2 className="size-6 text-accent" />
                <span>Start Simulation</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 rounded-2xl border-2 hover:border-accent hover:bg-accent/5" asChild>
              <Link href="/dashboard/courses">
                <BookOpen className="size-6 text-primary" />
                <span>Browse Courses</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 rounded-2xl border-2 hover:border-accent hover:bg-accent/5" asChild>
              <Link href="/dashboard/progress">
                <Calendar className="size-6 text-chart-3" />
                <span>View Progress</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 rounded-2xl border-2 hover:border-accent hover:bg-accent/5" asChild>
              <Link href="/dashboard/profile">
                <Star className="size-6 text-chart-4" />
                <span>Edit Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
