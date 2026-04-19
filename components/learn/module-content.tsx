'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Circle,
  PlayCircle,
  Lock
} from 'lucide-react'
import type { Module, Lesson, UserProgress, Category, LifeStage } from '@/lib/types'

interface ModuleContentProps {
  module: Module & { 
    lessons: Lesson[]
    category: Category
    stage: LifeStage
  }
  progress: UserProgress[]
  userId: string
}

export function ModuleContent({ module, progress, userId }: ModuleContentProps) {
  // Calculate progress
  const completedCount = progress.filter(p => p.status === 'completed').length
  const progressPercent = module.lessons.length > 0 
    ? Math.round((completedCount / module.lessons.length) * 100) 
    : 0

  // Find next lesson to continue
  const completedLessonIds = progress
    .filter(p => p.status === 'completed')
    .map(p => p.lesson_id)
  
  const nextLesson = module.lessons.find(l => !completedLessonIds.includes(l.id))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/learn">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn
        </Link>
      </Button>

      {/* Module Header */}
      <Card className="mb-8">
        <div 
          className="h-2 rounded-t-lg"
          style={{ backgroundColor: module.category?.color || '#0d9488' }}
        />
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge style={{ backgroundColor: module.category?.color || '#0d9488', color: 'white' }}>
              {module.category?.name}
            </Badge>
            <Badge variant="outline">{module.difficulty}</Badge>
            <Badge variant="secondary">{module.stage?.name}</Badge>
          </div>
          <CardTitle className="text-2xl">{module.title}</CardTitle>
          <CardDescription className="text-base">{module.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{module.lessons.length} lessons</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{module.estimated_minutes} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{completedCount} / {module.lessons.length} completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Continue Button */}
          {nextLesson && (
            <Button asChild className="mt-6">
              <Link href={`/learn/${module.slug}/${nextLesson.slug}`}>
                {completedCount === 0 ? 'Start Learning' : 'Continue'}
                <PlayCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          {progressPercent === 100 && (
            <div className="mt-6 flex items-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Module Completed!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, index) => {
            const lessonProgress = progress.find(p => p.lesson_id === lesson.id)
            const isCompleted = lessonProgress?.status === 'completed'
            const isInProgress = lessonProgress?.status === 'in_progress'
            const isLocked = index > 0 && !completedLessonIds.includes(module.lessons[index - 1].id) && !isCompleted && !isInProgress

            return (
              <Card 
                key={lesson.id} 
                className={`transition-all ${isLocked ? 'opacity-50' : 'hover:shadow-md'}`}
              >
                <CardContent className="p-4">
                  {isLocked ? (
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-muted-foreground">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete previous lesson to unlock
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={`/learn/${module.slug}/${lesson.slug}`}
                      className="flex items-center gap-4"
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-emerald-500/10' 
                          : isInProgress 
                            ? 'bg-primary/10' 
                            : 'bg-muted'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : isInProgress ? (
                          <PlayCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{lesson.title}</h3>
                          {lesson.lesson_type === 'simulation' && (
                            <Badge variant="secondary">Simulation</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{lesson.estimated_minutes} min</span>
                          {isCompleted && (
                            <span className="text-emerald-600">Completed</span>
                          )}
                          {isInProgress && (
                            <span className="text-primary">In Progress</span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
