import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Lock } from 'lucide-react'

export default async function AchievementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all visible achievements
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_secret', false)
    .order('xp_reward', { ascending: false })

  // Fetch user's earned achievements
  const { data: userAchievements } = await supabase
    .from('user_achievements')
    .select('achievement_id, earned_at')
    .eq('user_id', user?.id)

  const earnedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || [])
  const earnedCount = earnedIds.size
  const totalCount = achievements?.length || 0

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">
          Track your accomplishments and earn rewards
        </p>
      </div>

      {/* Progress */}
      <Card className="bg-card border-border">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Trophy className="size-8 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{earnedCount} / {totalCount}</p>
                <p className="text-muted-foreground">Achievements Earned</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-foreground">
                {totalCount > 0 ? Math.round((earnedCount / totalCount) * 100) : 0}%
              </p>
              <p className="text-sm text-muted-foreground">Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements && achievements.length > 0 ? (
          achievements.map((achievement) => {
            const isEarned = earnedIds.has(achievement.id)

            return (
              <Card 
                key={achievement.id} 
                className={`bg-card border-border transition-all ${
                  isEarned 
                    ? 'border-accent/50' 
                    : 'opacity-60 grayscale'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`size-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      isEarned ? 'bg-accent/10' : 'bg-secondary'
                    }`}>
                      {isEarned ? (achievement.icon || '🏆') : <Lock className="size-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-foreground truncate">{achievement.name}</h3>
                        <Badge variant={isEarned ? "default" : "secondary"} className="flex-shrink-0">
                          {achievement.xp_reward} XP
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full">
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Trophy className="size-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No achievements available yet</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Complete courses and simulations to unlock achievements!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
