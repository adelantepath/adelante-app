'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  BookOpen, 
  Clock, 
  Flame,
  Award,
  Medal,
  Crown,
  Lock
} from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: string
  points: number
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

const achievementIcons: Record<string, React.ElementType> = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  book: BookOpen,
  clock: Clock,
  flame: Flame,
  award: Award,
  medal: Medal,
  crown: Crown,
}

const defaultAchievements: Achievement[] = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: 'star', category: 'learning', points: 10, unlocked: false, progress: 0, maxProgress: 1 },
  { id: '2', name: 'Knowledge Seeker', description: 'Complete 5 lessons', icon: 'book', category: 'learning', points: 25, unlocked: false, progress: 0, maxProgress: 5 },
  { id: '3', name: 'Module Master', description: 'Complete an entire module', icon: 'trophy', category: 'learning', points: 50, unlocked: false, progress: 0, maxProgress: 1 },
  { id: '4', name: 'Budget Boss', description: 'Complete the budget simulation', icon: 'target', category: 'simulation', points: 30, unlocked: false, progress: 0, maxProgress: 1 },
  { id: '5', name: 'Decision Maker', description: 'Complete 3 simulations', icon: 'zap', category: 'simulation', points: 75, unlocked: false, progress: 0, maxProgress: 3 },
  { id: '6', name: 'Week Warrior', description: 'Learn for 7 days in a row', icon: 'flame', category: 'streak', points: 50, unlocked: false, progress: 0, maxProgress: 7 },
  { id: '7', name: 'Month Champion', description: 'Learn for 30 days in a row', icon: 'crown', category: 'streak', points: 200, unlocked: false, progress: 0, maxProgress: 30 },
  { id: '8', name: 'Quick Learner', description: 'Complete 3 lessons in one day', icon: 'clock', category: 'daily', points: 20, unlocked: false, progress: 0, maxProgress: 3 },
  { id: '9', name: 'Finance Fundamentals', description: 'Complete the Money & Finance module', icon: 'medal', category: 'mastery', points: 100, unlocked: false, progress: 0, maxProgress: 1 },
  { id: '10', name: 'Life Ready', description: 'Complete all modules in a stage', icon: 'award', category: 'mastery', points: 250, unlocked: false, progress: 0, maxProgress: 1 },
]

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>(defaultAchievements)
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAchievements() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Fetch user achievements from database
        const { data: userAchievements } = await supabase
          .from('user_achievements')
          .select('achievement_id, unlocked_at')
          .eq('user_id', user.id)

        if (userAchievements) {
          const unlockedIds = new Set(userAchievements.map(a => a.achievement_id))
          setAchievements(prev => prev.map(a => ({
            ...a,
            unlocked: unlockedIds.has(a.id),
            unlockedAt: userAchievements.find(ua => ua.achievement_id === a.id)?.unlocked_at
          })))
          
          const points = defaultAchievements
            .filter(a => unlockedIds.has(a.id))
            .reduce((sum, a) => sum + a.points, 0)
          setTotalPoints(points)
        }
      }
      
      setLoading(false)
    }

    fetchAchievements()
  }, [])

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const categories = ['learning', 'simulation', 'streak', 'daily', 'mastery']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress and earn rewards as you learn
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Trophy className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-primary">{unlockedCount}</p>
            <p className="text-sm text-muted-foreground">Achievements Unlocked</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-3">
              <Star className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-amber-500">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-3">
              <Target className="h-6 w-6" />
            </div>
            <p className="text-3xl font-bold text-green-500">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
            <p className="text-sm text-muted-foreground">Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {unlockedCount} of {achievements.length} achievements
            </span>
          </div>
          <Progress value={(unlockedCount / achievements.length) * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Achievements by Category */}
      {categories.map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category)
        if (categoryAchievements.length === 0) return null

        const categoryLabels: Record<string, string> = {
          learning: 'Learning Milestones',
          simulation: 'Simulation Achievements',
          streak: 'Consistency Rewards',
          daily: 'Daily Challenges',
          mastery: 'Mastery Awards',
        }

        return (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 capitalize">{categoryLabels[category]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map(achievement => {
                const Icon = achievementIcons[achievement.icon] || Trophy
                const progress = achievement.progress || 0
                const maxProgress = achievement.maxProgress || 1
                const progressPercent = (progress / maxProgress) * 100

                return (
                  <Card 
                    key={achievement.id} 
                    className={`border-border transition-all ${
                      achievement.unlocked 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'opacity-70'
                    }`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
                          achievement.unlocked 
                            ? 'bg-primary text-white' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {achievement.unlocked ? (
                            <Icon className="h-6 w-6" />
                          ) : (
                            <Lock className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{achievement.name}</h3>
                            <Badge variant="outline" className="shrink-0 text-xs">
                              +{achievement.points}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {achievement.description}
                          </p>
                          {!achievement.unlocked && achievement.maxProgress && achievement.maxProgress > 1 && (
                            <div className="mt-2">
                              <Progress value={progressPercent} className="h-1.5" />
                              <p className="text-xs text-muted-foreground mt-1">
                                {progress} / {maxProgress}
                              </p>
                            </div>
                          )}
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
