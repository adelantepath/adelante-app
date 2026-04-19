'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp,
  DollarSign,
  Home,
  Heart,
  Car,
  Briefcase,
  Scale,
  Users
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import type { Profile, LifeStage, Category, Module, UserProgress, UserAchievement } from '@/lib/types'

interface DashboardContentProps {
  user: User
  profile: Profile | null
  stages: LifeStage[]
  categories: Category[]
  modules: (Module & { lessons: { id: string }[] })[]
  progress: UserProgress[]
  achievements: UserAchievement[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  DollarSign,
  Home,
  Heart,
  Car,
  Briefcase,
  Scale,
  Clock,
  Users,
}

export function DashboardContent({
  user,
  profile,
  stages,
  categories,
  modules,
  progress,
  achievements,
}: DashboardContentProps) {
  // Calculate stats
  const completedLessons = progress.filter(p => p.status === 'completed').length
  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const totalTimeSpent = progress.reduce((acc, p) => acc + (p.time_spent_seconds || 0), 0)
  const hoursSpent = Math.round(totalTimeSpent / 3600 * 10) / 10

  // Get modules with progress
  const modulesWithProgress = modules.map(module => {
    const moduleLessonIds = module.lessons?.map(l => l.id) || []
    const completedCount = progress.filter(
      p => moduleLessonIds.includes(p.lesson_id) && p.status === 'completed'
    ).length
    const progressPercent = moduleLessonIds.length > 0 
      ? Math.round((completedCount / moduleLessonIds.length) * 100) 
      : 0
    return { ...module, progressPercent, completedCount }
  })

  // Get in-progress and recommended modules
  const inProgressModules = modulesWithProgress.filter(
    m => m.progressPercent > 0 && m.progressPercent < 100
  ).slice(0, 3)

  const recommendedModules = modulesWithProgress.filter(
    m => m.progressPercent === 0
  ).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {profile?.first_name || user.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Continue your journey to real-life readiness
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold">{completedLessons} / {totalLessons}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Invested</p>
                <p className="text-2xl font-bold">{hoursSpent}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold">{achievements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          {inProgressModules.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Continue Learning</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/learn">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {inProgressModules.map((module) => (
                  <Card key={module.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <Link href={`/learn/${module.slug}`} className="block">
                        <div className="flex items-start gap-4">
                          <div 
                            className="h-12 w-12 rounded-lg flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: module.category?.color || '#0d9488' }}
                          >
                            <BookOpen className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{module.title}</h3>
                              <Badge variant="secondary" className="shrink-0">
                                {module.category?.name}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                              {module.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <Progress value={module.progressPercent} className="flex-1 h-2" />
                              <span className="text-sm font-medium text-muted-foreground">
                                {module.progressPercent}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Modules */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {inProgressModules.length > 0 ? 'Recommended Next' : 'Start Learning'}
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/learn">
                  Browse All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedModules.map((module) => (
                <Card key={module.id} className="hover:shadow-md transition-shadow group">
                  <CardContent className="p-4">
                    <Link href={`/learn/${module.slug}`} className="block">
                      <div 
                        className="h-2 rounded-full mb-4"
                        style={{ backgroundColor: module.category?.color || '#0d9488' }}
                      />
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {module.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{module.difficulty}</Badge>
                        <span className="text-muted-foreground">
                          {module.estimated_minutes} min
                        </span>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/learn">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Modules
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/simulations">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Try a Simulation
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/achievements">
                  <Trophy className="mr-2 h-4 w-4" />
                  View Achievements
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Categories Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Learning Categories</CardTitle>
              <CardDescription>Explore different life skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.slice(0, 5).map((category) => {
                  const categoryModules = modulesWithProgress.filter(
                    m => m.category_id === category.id
                  )
                  const avgProgress = categoryModules.length > 0
                    ? Math.round(
                        categoryModules.reduce((acc, m) => acc + m.progressPercent, 0) / 
                        categoryModules.length
                      )
                    : 0

                  return (
                    <Link
                      key={category.id}
                      href={`/learn?category=${category.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div 
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: category.color || '#0d9488' }}
                      >
                        {category.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{category.name}</p>
                        <Progress value={avgProgress} className="h-1 mt-1" />
                      </div>
                      <span className="text-xs text-muted-foreground">{avgProgress}%</span>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          {achievements.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((ua) => (
                    <div key={ua.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Trophy className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{ua.achievement?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          +{ua.achievement?.points} points
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
