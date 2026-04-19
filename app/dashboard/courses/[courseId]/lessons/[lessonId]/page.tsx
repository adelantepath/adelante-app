'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  BookOpen,
  PlayCircle,
  FileQuestion,
  Gamepad2
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Lesson {
  id: string
  title: string
  type: string
  content: string | null
  video_url: string | null
  xp_reward: number
  order_index: number
  module_id: string
  modules: {
    id: string
    title: string
    course_id: string
    courses: {
      id: string
      title: string
    }
  }
}

interface PageProps {
  params: Promise<{ courseId: string; lessonId: string }>
}

export default function LessonPage({ params }: PageProps) {
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [nextLesson, setNextLesson] = useState<string | null>(null)
  const [prevLesson, setPrevLesson] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{ courseId: string; lessonId: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return
    
    async function loadLesson() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      // Fetch lesson with module and course info
      const { data: lessonData } = await supabase
        .from('lessons')
        .select(`
          *,
          modules(
            id,
            title,
            course_id,
            courses(id, title)
          )
        `)
        .eq('id', resolvedParams.lessonId)
        .single()

      if (lessonData) {
        setLesson(lessonData)
        
        // Check if already completed
        const { data: completion } = await supabase
          .from('lesson_completions')
          .select('id')
          .eq('user_id', user?.id)
          .eq('lesson_id', lessonData.id)
          .single()
        
        setIsCompleted(!!completion)
        
        // Get all lessons in the course to determine prev/next
        const { data: allLessons } = await supabase
          .from('lessons')
          .select('id, order_index, modules!inner(course_id, order_index)')
          .eq('modules.course_id', resolvedParams.courseId)
          .order('modules(order_index)')
          .order('order_index')
        
        if (allLessons) {
          const currentIndex = allLessons.findIndex(l => l.id === resolvedParams.lessonId)
          if (currentIndex > 0) {
            setPrevLesson(allLessons[currentIndex - 1].id)
          }
          if (currentIndex < allLessons.length - 1) {
            setNextLesson(allLessons[currentIndex + 1].id)
          }
        }
      }
      
      setLoading(false)
    }
    
    loadLesson()
  }, [resolvedParams])

  async function handleComplete() {
    if (!lesson || !resolvedParams) return
    
    setIsCompleting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      // Mark lesson as complete
      await supabase.from('lesson_completions').upsert({
        user_id: user.id,
        lesson_id: lesson.id,
        xp_earned: lesson.xp_reward || 10,
        completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,lesson_id' })
      
      // Update user stats
      await supabase.rpc('increment_user_stat', {
        p_user_id: user.id,
        p_stat: 'lessons_completed',
        p_amount: 1
      })
      
      await supabase.rpc('increment_user_stat', {
        p_user_id: user.id,
        p_stat: 'total_xp',
        p_amount: lesson.xp_reward || 10
      })
      
      setIsCompleted(true)
    }
    
    setIsCompleting(false)
  }

  if (loading || !resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-16">
        <div className="size-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="pt-16">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/courses/${resolvedParams.courseId}`}>
            <ArrowLeft className="size-4 mr-2" />
            Back to Course
          </Link>
        </Button>
        <p className="text-center text-muted-foreground mt-8">Lesson not found</p>
      </div>
    )
  }

  const getLessonIcon = () => {
    switch (lesson.type) {
      case 'video': return <PlayCircle className="size-5" />
      case 'quiz': return <FileQuestion className="size-5" />
      case 'simulation': return <Gamepad2 className="size-5" />
      default: return <BookOpen className="size-5" />
    }
  }

  return (
    <div className="space-y-6 pt-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href={`/dashboard/courses/${resolvedParams.courseId}`}>
            <ArrowLeft className="size-4 mr-2" />
            {lesson.modules?.courses?.title}
          </Link>
        </Button>
        
        <div className="flex items-center gap-2">
          {prevLesson && (
            <Button variant="outline" size="icon" asChild>
              <Link href={`/dashboard/courses/${resolvedParams.courseId}/lessons/${prevLesson}`}>
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
          )}
          {nextLesson && (
            <Button variant="outline" size="icon" asChild>
              <Link href={`/dashboard/courses/${resolvedParams.courseId}/lessons/${nextLesson}`}>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                {getLessonIcon()}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{lesson.modules?.title}</p>
                <CardTitle className="text-xl">{lesson.title}</CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isCompleted && (
                <Badge className="bg-accent text-accent-foreground">
                  <CheckCircle2 className="size-3 mr-1" />
                  Completed
                </Badge>
              )}
              <Badge variant="secondary">+{lesson.xp_reward || 10} XP</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.type === 'video' && lesson.video_url && (
            <div className="aspect-video rounded-lg bg-secondary mb-6 overflow-hidden">
              <iframe
                src={lesson.video_url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          
          {lesson.content && (
            <div 
              className="prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          )}
          
          {!lesson.content && !lesson.video_url && (
            <div className="text-center py-12">
              <BookOpen className="size-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Lesson content coming soon...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complete Button */}
      <div className="flex items-center justify-between">
        <div>
          {prevLesson && (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/courses/${resolvedParams.courseId}/lessons/${prevLesson}`}>
                <ArrowLeft className="size-4 mr-2" />
                Previous Lesson
              </Link>
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {!isCompleted && (
            <Button 
              onClick={handleComplete}
              disabled={isCompleting}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isCompleting ? 'Marking...' : 'Mark as Complete'}
              <CheckCircle2 className="size-4 ml-2" />
            </Button>
          )}
          
          {nextLesson ? (
            <Button asChild>
              <Link href={`/dashboard/courses/${resolvedParams.courseId}/lessons/${nextLesson}`}>
                Next Lesson
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/dashboard/courses/${resolvedParams.courseId}`}>
                Back to Course
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
