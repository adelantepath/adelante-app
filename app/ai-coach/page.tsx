import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AICoachChat } from '@/components/ai/ai-coach-chat'

export default async function AICoachPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AICoachChat userId={user.id} />
}
