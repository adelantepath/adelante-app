import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { LessonViewer } from '@/components/learn/lesson-viewer'

interface LessonPageProps {
  params: Promise<{ moduleSlug: string; lessonSlug: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch module
  const { data: module } = await supabase
    .from('modules')
    .select(`
      *,
      category:categories(*),
      lessons(*)
    `)
    .eq('slug', moduleSlug)
    .eq('is_published', true)
    .single()

  if (!module) {
    notFound()
  }

  // Sort lessons
  module.lessons.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)

  // Find current lesson
  const lesson = module.lessons.find((l: { slug: string }) => l.slug === lessonSlug)
  if (!lesson) {
    notFound()
  }

  // Find lesson index for navigation
  const lessonIndex = module.lessons.findIndex((l: { slug: string }) => l.slug === lessonSlug)
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null

  // Fetch or create progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson.id)
    .single()

  return (
    <LessonViewer
      module={module}
      lesson={lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      progress={progress}
      userId={user.id}
      lessonNumber={lessonIndex + 1}
      totalLessons={module.lessons.length}
    />
  )
}
