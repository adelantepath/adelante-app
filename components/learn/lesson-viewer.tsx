'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Lightbulb,
  AlertTriangle,
  Info,
  BookOpen,
  X
} from 'lucide-react'
import type { Module, Lesson, UserProgress, LessonContent, ContentSection } from '@/lib/types'

interface LessonViewerProps {
  module: Module & { category: { name: string; color: string } }
  lesson: Lesson
  prevLesson: Lesson | null
  nextLesson: Lesson | null
  progress: UserProgress | null
  userId: string
  lessonNumber: number
  totalLessons: number
}

export function LessonViewer({
  module,
  lesson,
  prevLesson,
  nextLesson,
  progress,
  userId,
  lessonNumber,
  totalLessons,
}: LessonViewerProps) {
  const router = useRouter()
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(progress?.status === 'completed')
  const [startTime] = useState(Date.now())

  const content = lesson.content as LessonContent | null

  // Update progress on mount
  useEffect(() => {
    const updateProgress = async () => {
      const supabase = createClient()
      
      if (!progress) {
        // Create new progress
        await supabase.from('user_progress').insert({
          user_id: userId,
          lesson_id: lesson.id,
          status: 'in_progress',
        })
      } else if (progress.status === 'not_started') {
        // Update to in_progress
        await supabase
          .from('user_progress')
          .update({ status: 'in_progress' })
          .eq('id', progress.id)
      }
    }
    
    updateProgress()
  }, [lesson.id, userId, progress])

  const handleComplete = async () => {
    setIsCompleting(true)
    const supabase = createClient()
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    
    if (progress) {
      await supabase
        .from('user_progress')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          time_spent_seconds: (progress.time_spent_seconds || 0) + timeSpent,
        })
        .eq('id', progress.id)
    } else {
      await supabase.from('user_progress').insert({
        user_id: userId,
        lesson_id: lesson.id,
        status: 'completed',
        completed_at: new Date().toISOString(),
        time_spent_seconds: timeSpent,
      })
    }

    setIsCompleted(true)
    setIsCompleting(false)

    // Navigate to next lesson or back to module
    if (nextLesson) {
      router.push(`/learn/${module.slug}/${nextLesson.slug}`)
    } else {
      router.push(`/learn/${module.slug}`)
    }
    router.refresh()
  }

  const renderSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <p key={index} className="text-lg leading-relaxed">
            {section.content}
          </p>
        )

      case 'key_points':
        return (
          <Card key={index} className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.points?.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )

      case 'real_world':
        return (
          <Card key={index} className="bg-emerald-50 border-emerald-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-800 mb-1">Real World Example</p>
                  <p className="text-emerald-700">{section.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 'warning':
        return (
          <Card key={index} className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.content && <p className="text-amber-700">{section.content}</p>}
              {section.items && (
                <ul className="space-y-2 mt-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-amber-600 font-bold">{item.cost}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )

      case 'tip':
        return (
          <Card key={index} className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-blue-700">{section.content}</p>
              </div>
            </CardContent>
          </Card>
        )

      case 'comparison':
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              {section.description && (
                <p className="text-muted-foreground">{section.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )

      case 'do_dont':
        return (
          <div key={index} className="grid md:grid-cols-2 gap-4">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-emerald-700 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.do?.map((item, i) => (
                    <li key={i} className="text-emerald-700">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                  <X className="h-5 w-5" />
                  {"Don't"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.dont?.map((item, i) => (
                    <li key={i} className="text-red-700">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )

      case 'math_example':
        return (
          <Card key={index} className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-800">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-2">{section.scenario}</p>
              {section.result && (
                <p className="font-bold text-purple-800 text-lg">{section.result}</p>
              )}
              {section.comparisons && (
                <div className="space-y-2 mt-3">
                  {section.comparisons.map((c, i) => (
                    <div key={i} className="flex justify-between p-2 bg-white rounded">
                      <span>Start at age {c.age}</span>
                      <span className="font-bold">{c.by_65}</span>
                    </div>
                  ))}
                </div>
              )}
              {section.conclusion && (
                <p className="mt-3 font-medium text-purple-800">{section.conclusion}</p>
              )}
            </CardContent>
          </Card>
        )

      case 'breakdown':
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {section.factors ? (
                <div className="space-y-3">
                  {section.factors.map((factor, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{factor.name}</span>
                        <span className="text-muted-foreground">{factor.percentage}%</span>
                      </div>
                      <Progress value={factor.percentage} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-1">{factor.tip}</p>
                    </div>
                  ))}
                </div>
              ) : section.items ? (
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="border-b pb-2 last:border-0">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
        )

      case 'scale':
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.ranges?.map((range, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded bg-muted/50">
                    <Badge variant="outline" className="font-mono">{range.range}</Badge>
                    <span className="font-medium">{range.label}</span>
                    <span className="text-sm text-muted-foreground">{range.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'steps':
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.steps?.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case 'strategy':
        return (
          <Card key={index} className="bg-indigo-50 border-indigo-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-indigo-800">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.points?.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-indigo-700">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )

      case 'deadline':
        return (
          <Card key={index} className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <p className="text-red-700 font-medium">{section.content}</p>
              </div>
            </CardContent>
          </Card>
        )

      case 'action':
        return (
          <Card key={index} className="bg-emerald-50 border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-800">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 list-decimal list-inside">
                {section.steps?.map((step, i) => (
                  <li key={i} className="text-emerald-700">{step.title || step.details}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )

      case 'example':
        return (
          <Card key={index} className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">{section.content}</p>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href={`/learn/${module.slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {module.title}
          </Link>
        </Button>

        <div className="flex items-center gap-2 mb-2">
          <Badge style={{ backgroundColor: module.category?.color || '#0d9488', color: 'white' }}>
            {module.category?.name}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Lesson {lessonNumber} of {totalLessons}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lesson.estimated_minutes} min</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <Progress value={(lessonNumber / totalLessons) * 100} className="h-1" />
        </div>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6 mb-12">
        {content?.sections?.map((section, index) => renderSection(section, index))}
        
        {!content?.sections?.length && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {lesson.lesson_type === 'simulation' 
                  ? 'This is a simulation lesson. Click below to start the interactive experience.'
                  : 'Content coming soon...'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between">
          {prevLesson ? (
            <Button variant="outline" asChild>
              <Link href={`/learn/${module.slug}/${prevLesson.slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {!isCompleted ? (
            <Button onClick={handleComplete} disabled={isCompleting}>
              {isCompleting ? 'Saving...' : 'Mark as Complete'}
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          ) : nextLesson ? (
            <Button asChild>
              <Link href={`/learn/${module.slug}/${nextLesson.slug}`}>
                Next Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={`/learn/${module.slug}`}>
                Back to Module
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
