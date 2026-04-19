import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LearnContent } from '@/components/learn/learn-content'

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch life stages
  const { data: stages } = await supabase
    .from('life_stages')
    .select('*')
    .order('order_index')

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('order_index')

  // Fetch modules with lessons count
  const { data: modules } = await supabase
    .from('modules')
    .select(`
      *,
      category:categories(*),
      stage:life_stages(*),
      lessons(id)
    `)
    .eq('is_published', true)
    .order('order_index')

  // Fetch user progress
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)

  return (
    <LearnContent
      stages={stages || []}
      categories={categories || []}
      modules={modules || []}
      progress={progress || []}
    />
  )
}
