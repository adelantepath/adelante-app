import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/dashboard-nav'
import { DashboardHeader, MobileDashboardHeader } from '@/components/dashboard/dashboard-header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} />
      <MobileDashboardHeader user={user} profile={profile} />
      <div className="flex">
        <DashboardNav />
        <main className="flex-1 p-6 pt-20 lg:pt-24 lg:p-8 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
