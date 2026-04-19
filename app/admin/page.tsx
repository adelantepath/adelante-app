import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  Gamepad2, 
  Trophy,
  TrendingUp,
  Activity,
  GraduationCap,
  Building2
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Fetch stats
  const [
    { count: totalUsers },
    { count: totalCourses },
    { count: totalSimulations },
    { count: totalOrganizations },
    { count: activeTodayUsers },
    { data: recentUsers }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('simulations').select('*', { count: 'exact', head: true }),
    supabase.from('organizations').select('*', { count: 'exact', head: true }),
    supabase.from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('last_active', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    supabase.from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of platform activity and content
        </p>
      </div>

      {/* Stats Grid */}
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
                <Activity className="size-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeTodayUsers || 0}</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <BookOpen className="size-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCourses || 0}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gamepad2 className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalSimulations || 0}</p>
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
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Newly registered users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUsers && recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
                        {(user.full_name || user.email || '?').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {user.full_name || 'Unnamed'}
                      </p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No users yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Platform overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Building2 className="size-5 text-chart-3" />
                </div>
                <span className="font-medium text-foreground">Organizations</span>
              </div>
              <span className="text-lg font-bold text-foreground">{totalOrganizations || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BookOpen className="size-5 text-accent" />
                </div>
                <span className="font-medium text-foreground">Published Courses</span>
              </div>
              <span className="text-lg font-bold text-foreground">{totalCourses || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gamepad2 className="size-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">Active Simulations</span>
              </div>
              <span className="text-lg font-bold text-foreground">{totalSimulations || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <GraduationCap className="size-5 text-chart-2" />
                </div>
                <span className="font-medium text-foreground">Certificates Issued</span>
              </div>
              <span className="text-lg font-bold text-foreground">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
