'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp,
  Zap,
  Flame,
  Target,
  Play,
  Star,
  Award,
  Calendar,
  ChevronRight,
  Sparkles
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

// Mock leaderboard data - in production this would come from the database
const leaderboardData = [
  { name: 'Sakshi', xp: 1900, days: 28, avatar: null, rank: 2 },
  { name: 'Rahul', xp: 2120, days: 36, avatar: null, rank: 1 },
  { name: 'Pallavi', xp: 1890, days: 27, avatar: null, rank: 3 },
]

const weeklyLeaderboard = [
  { name: 'Ananya', xp: 1820, days: 27, rank: 4 },
  { name: 'Gayathri', xp: 1810, days: 27, rank: 5 },
  { name: 'Ronika', xp: 1780, days: 26, rank: 6 },
]

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
  
  // Mock XP and gamification stats
  const xp = 1320
  const level = 'Trainee'
  const streak = 9
  const rank = 10
  const maxStreak = 9

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

  // Get current/in-progress module
  const inProgressModules = modulesWithProgress.filter(
    m => m.progressPercent > 0 && m.progressPercent < 100
  ).slice(0, 1)

  const currentModule = inProgressModules[0] || modulesWithProgress[0]
  const currentModuleProgress = currentModule?.progressPercent || 0

  // Generate calendar data for current month
  const today = new Date()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  
  // Mock activity data - days with completed lessons
  const activeDays = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]

  const displayName = profile?.first_name || user.email?.split('@')[0] || 'Learner'

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Hello {displayName}!
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Flame className="h-5 w-5 text-orange-300" />
              <span className="font-medium">You&apos;re on fire! Keep the {streak}-day streak going!</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{streak}</div>
              <div className="text-sm text-white/80">Day Streak</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold">{completedLessons}</div>
              <div className="text-sm text-white/80">Lessons Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl xp-badge flex items-center justify-center">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{xp.toLocaleString()} XP</p>
              <p className="text-sm text-muted-foreground">Current XP</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl level-badge flex items-center justify-center">
              <Trophy className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{level}</p>
              <p className="text-sm text-muted-foreground">Your Level</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl streak-badge flex items-center justify-center">
              <Flame className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{streak} Days</p>
              <p className="text-sm text-muted-foreground">Streak</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl rank-badge flex items-center justify-center">
              <Target className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">#{rank}</p>
              <p className="text-sm text-muted-foreground">Rank</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress */}
          <Card className="course-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Course Progress</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/learn">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {currentModule && (
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex gap-4">
                    <div 
                      className="h-24 w-24 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: currentModule.category?.color || '#7c3aed' }}
                    >
                      <Play className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1">{currentModule.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Module {currentModule.order_index || 1} of {modules.length}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Module Progress</span>
                          <span className="font-medium">{currentModuleProgress}% completed</span>
                        </div>
                        <Progress value={currentModuleProgress} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Overall Progress</span>
                          <span className="font-medium">{overallProgress}% completed</span>
                        </div>
                        <Progress value={overallProgress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-sm text-amber-600">
                          <Zap className="h-4 w-4" />
                          <span>+120 XP on completion</span>
                        </div>
                        <Button size="sm" className="ml-auto btn-primary-glow" asChild>
                          <Link href={`/learn/${currentModule.slug}`}>
                            Continue
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Challenge & Learning Efficiency */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="course-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Today&apos;s Challenge</CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Test your skills & earn +50 XP!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-32 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-amber-500" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">Complete a budget simulation to test your financial skills</p>
                  <Button className="w-full btn-primary-glow" asChild>
                    <Link href="/simulations/budget-challenge">
                      Start Challenge
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Updated daily - Skipping resets streak
                </p>
              </CardContent>
            </Card>

            <Card className="course-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative h-32 w-32">
                    <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e9d5ff"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${73 * 2.51} ${100 * 2.51}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">73%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Quiz accuracy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Active Learning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-muted-foreground">Incomplete Tasks</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border text-sm text-center text-muted-foreground">
                  <span className="font-medium text-foreground">Weekly report:</span> Quiz Accuracy +4%, Active Days -1
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Monthly Activity Calendar */}
          <Card className="course-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Activity
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  {today.toLocaleString('default', { month: 'long' })}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Empty days for alignment */}
                {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-day" />
                ))}
                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const isToday = day === today.getDate()
                  const isActive = activeDays.includes(day)
                  return (
                    <div
                      key={day}
                      className={`calendar-day ${isActive ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
              
              <div className="flex items-center justify-between mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-emerald-500" />
                  <span className="text-muted-foreground">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded border-2 border-primary" />
                  <span className="text-muted-foreground">Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  <span className="text-muted-foreground">Max: {maxStreak} days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="course-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Leaderboard</CardTitle>
              <CardDescription>This Week&apos;s Top Learners</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Top 3 Podium */}
              <div className="flex items-end justify-center gap-2 mb-4">
                {/* 2nd Place */}
                <div className="text-center">
                  <Avatar className="h-10 w-10 mx-auto mb-1 border-2 border-gray-300">
                    <AvatarFallback className="bg-gray-100 text-sm">S</AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-medium truncate w-16">{leaderboardData[0].name}</p>
                  <div className="bg-gray-200 rounded-t-lg h-12 w-16 flex items-center justify-center mt-1">
                    <span className="text-lg font-bold text-gray-600">2</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{leaderboardData[0].xp} XP</p>
                </div>
                
                {/* 1st Place */}
                <div className="text-center">
                  <div className="relative">
                    <Avatar className="h-12 w-12 mx-auto mb-1 border-2 border-amber-400">
                      <AvatarFallback className="bg-amber-100 text-sm">R</AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-amber-400 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                  <p className="text-xs font-medium truncate w-16">{leaderboardData[1].name}</p>
                  <div className="bg-amber-400 rounded-t-lg h-16 w-16 flex items-center justify-center mt-1">
                    <span className="text-xl font-bold text-white">1</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{leaderboardData[1].xp} XP</p>
                </div>
                
                {/* 3rd Place */}
                <div className="text-center">
                  <Avatar className="h-10 w-10 mx-auto mb-1 border-2 border-amber-700">
                    <AvatarFallback className="bg-amber-50 text-sm">P</AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-medium truncate w-16">{leaderboardData[2].name}</p>
                  <div className="bg-amber-700 rounded-t-lg h-10 w-16 flex items-center justify-center mt-1">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{leaderboardData[2].xp} XP</p>
                </div>
              </div>

              {/* Rest of leaderboard */}
              <div className="space-y-2">
                {weeklyLeaderboard.map((person) => (
                  <div key={person.rank} className="leaderboard-item">
                    <span className="text-sm font-medium w-6">{person.rank}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-xs">{person.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium flex-1">{person.name}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Flame className="h-3 w-3 text-orange-500" />
                      {person.days}d
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {person.xp}
                    </Badge>
                  </div>
                ))}
                
                {/* Current user */}
                <div className="leaderboard-item bg-primary/5 border border-primary/20">
                  <span className="text-sm font-medium w-6">{rank}</span>
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {displayName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium flex-1">You</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="h-3 w-3 text-orange-500" />
                    {streak}d
                  </div>
                  <Badge className="text-xs bg-primary">
                    <Zap className="h-3 w-3 mr-1" />
                    {xp}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
