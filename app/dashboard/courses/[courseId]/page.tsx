import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle,
  Lock
} from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ courseId: string }>
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { courseId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch course with modules and lessons
  const { data: course } = await supabase
    .from('courses')
    .select(`
      *,
      course_categories(name, color),
      modules(
        id,
        title,
        description,
        order_index,
        lessons(
          id,
          title,
          type,
          order_index,
          xp_reward
        )
      )
    `)
    .eq('id', courseId)
    .eq('is_published', true)
    .single()

  if (!course) {
    notFound()
  }

  // Fetch user's completed lessons for this course
  const { data: completions } = await supabase
    .from('lesson_completions')
    .select('lesson_id')
    .eq('user_id', user?.id)

  const completedLessonIds = new Set(completions?.map(c => c.lesson_id) || [])

  // Calculate progress
  const allLessons = course.modules?.flatMap(m => m.lessons) || []
  const totalLessons = allLessons.length
  const completedLessons = allLessons.filter(l => completedLessonIds.has(l.id)).length
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  // Sort modules and lessons by order
  const sortedModules = [...(course.modules || [])].sort((a, b) => a.order_index - b.order_index)
  sortedModules.forEach(module => {
    module.lessons = [...(module.lessons || [])].sort((a, b) => a.order_index - b.order_index)
  })

  // Find the next lesson to continue
  let nextLesson: { moduleId: string; lessonId: string } | null = null
  for (const module of sortedModules) {
    for (const lesson of module.lessons || []) {
      if (!completedLessonIds.has(lesson.id)) {
        nextLesson = { moduleId: module.id, lessonId: lesson.id }
        break
      }
    }
    if (nextLesson) break
  }

  return (
    <div className="space-y-8 pt-16">
      {/* Back button */}
      <Button variant="ghost" asChild>
        <Link href="/dashboard/courses">
          <ArrowLeft className="size-4 mr-2" />
          Back to Courses
        </Link>
      </Button>

      {/* Course Header */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {course.course_categories && (
              <Badge variant="secondary">{course.course_categories.name}</Badge>
            )}
            <Badge variant="outline">
              {course.age_group === 'elementary' ? 'Ages 10-12' :
               course.age_group === 'middle' ? 'Ages 13-15' :
               course.age_group === 'highschool' ? 'Ages 16-18' :
               course.age_group === 'adult' ? 'Ages 18+' : 'All Ages'}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground mt-2">{course.description}</p>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="size-4" />
              <span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{course.estimated_duration || '1h'}</span>
            </div>
          </div>
        </div>

        <Card className="w-full lg:w-80 bg-card border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {completedLessons} of {totalLessons} lessons completed
                </p>
              </div>
              
              {nextLesson ? (
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href={`/dashboard/courses/${courseId}/lessons/${nextLesson.lessonId}`}>
                    <PlayCircle className="size-4 mr-2" />
                    {completedLessons > 0 ? 'Continue Learning' : 'Start Course'}
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  <CheckCircle2 className="size-4 mr-2" />
                  Course Completed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules and Lessons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Course Content</h2>
        
        {sortedModules.map((module, moduleIndex) => (
          <Card key={module.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="size-6 rounded-full bg-accent/10 text-accent text-sm flex items-center justify-center">
                  {moduleIndex + 1}
                </span>
                {module.title}
              </CardTitle>
              {module.description && (
                <CardDescription>{module.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.lessons?.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessonIds.has(lesson.id)
                  const isLocked = false // All lessons are unlocked for now
                  
                  return (
                    <Link
                      key={lesson.id}
                      href={isLocked ? '#' : `/dashboard/courses/${courseId}/lessons/${lesson.id}`}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        isLocked 
                          ? 'opacity-50 cursor-not-allowed bg-secondary/30' 
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className={`size-8 rounded-lg flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-accent text-accent-foreground' 
                          : isLocked 
                            ? 'bg-secondary text-muted-foreground'
                            : 'bg-secondary text-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="size-4" />
                        ) : isLocked ? (
                          <Lock className="size-4" />
                        ) : (
                          <span className="text-sm">{lessonIndex + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{lesson.type}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        +{lesson.xp_reward || 10} XP
                      </Badge>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
