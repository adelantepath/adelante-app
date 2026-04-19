import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

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

  // Fetch modules with category info
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

  // Fetch user achievements
  const { data: achievements } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('user_id', user.id)

  return (
    <DashboardContent
      user={user}
      profile={profile}
      stages={stages || []}
      categories={categories || []}
      modules={modules || []}
      progress={progress || []}
      achievements={achievements || []}
    />
  )
}
