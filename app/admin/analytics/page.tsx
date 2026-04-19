import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp,
  Users,
  BookOpen,
  Gamepad2,
  Trophy,
  Activity,
  Clock
} from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  // Fetch analytics data
  const [
    { count: totalUsers },
    { count: totalCompletions },
    { count: totalSimulationResults },
    { count: totalCertificates },
    { data: topCourses },
    { data: recentActivity }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('lesson_completions').select('*', { count: 'exact', head: true }),
    supabase.from('simulation_results').select('*', { count: 'exact', head: true }),
    supabase.from('certificates').select('*', { count: 'exact', head: true }),
    supabase.from('courses')
      .select('id, title, total_modules')
      .eq('is_published', true)
      .limit(5),
    supabase.from('lesson_completions')
      .select('id, completed_at, xp_earned, profiles(full_name), lessons(title)')
      .order('completed_at', { ascending: false })
      .limit(10)
  ])

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Platform performance and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="size-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalUsers || 0}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <BookOpen className="size-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCompletions || 0}</p>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
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
                <p className="text-2xl font-bold text-foreground">{totalSimulationResults || 0}</p>
                <p className="text-sm text-muted-foreground">Simulations Run</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCertificates || 0}</p>
                <p className="text-sm text-muted-foreground">Certificates Issued</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Engagement Over Time
            </CardTitle>
            <CardDescription>Daily active users and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="size-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div className="size-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="size-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      <span className="font-medium">{activity.profiles?.full_name || 'User'}</span>
                      {' '}completed{' '}
                      <span className="font-medium">{activity.lessons?.title || 'a lesson'}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.completed_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="secondary">+{activity.xp_earned || 10} XP</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No activity yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Content */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Popular Courses</CardTitle>
          <CardDescription>Most enrolled courses on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCourses && topCourses.length > 0 ? (
              topCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                >
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center font-bold text-accent">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{course.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.total_modules || 0} modules
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No courses available yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
