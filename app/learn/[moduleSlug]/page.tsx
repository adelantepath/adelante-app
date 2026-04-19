import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ModuleContent } from '@/components/learn/module-content'

interface ModulePageProps {
  params: Promise<{ moduleSlug: string }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { moduleSlug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch module with lessons
  const { data: module } = await supabase
    .from('modules')
    .select(`
      *,
      category:categories(*),
      stage:life_stages(*),
      lessons(*)
    `)
    .eq('slug', moduleSlug)
    .eq('is_published', true)
    .single()

  if (!module) {
    notFound()
  }

  // Sort lessons by order_index
  if (module.lessons) {
    module.lessons.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
  }

  // Fetch user progress for this module's lessons
  const lessonIds = module.lessons?.map((l: { id: string }) => l.id) || []
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .in('lesson_id', lessonIds)

  return (
    <ModuleContent
      module={module}
      progress={progress || []}
      userId={user.id}
    />
  )
}
