'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User, 
  LogOut,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Flame,
  Zap
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Profile } from '@/lib/types'

interface DashboardNavProps {
  user: SupabaseUser
  profile: Profile | null
}

const learningItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'My Learning', icon: BookOpen },
  { href: '/achievements', label: 'Achievements', icon: Trophy },
  { href: '/simulations', label: 'Simulations', icon: Sparkles },
  { href: '/ai-coach', label: 'AI Coach', icon: MessageCircle },
]

const accountItems = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

export function DashboardNav({ user, profile }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const initials = profile?.first_name && profile?.last_name
    ? `${profile.first_name[0]}${profile.last_name[0]}`
    : user.email?.[0]?.toUpperCase() || 'U'

  const displayName = profile?.first_name || user.email?.split('@')[0] || 'Student'
  
  // Mock XP and level - in production these would come from the database
  const xp = 1320
  const level = 'Trainee'
  const streak = 9

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 h-16 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="Adelante" width={32} height={32} className="rounded-lg" />
          <span className="font-bold text-primary">Adelante</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="notification-badge">3</span>
          </Button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-[280px] bg-white border-r border-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Adelante Pathways" width={40} height={40} className="rounded-xl" />
            <span className="text-xl font-bold text-primary">Adelante</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile Card */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-14 w-14 border-3 border-white shadow-lg">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-foreground">{displayName}</h3>
                <p className="text-sm text-muted-foreground">Student</p>
              </div>
            </div>
            
            {/* XP and Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{xp.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">XP</p>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <div className="flex items-center justify-center gap-1 text-primary mb-1">
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{level}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Level</p>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-sm">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Flame className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{streak}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 overflow-y-auto">
          {/* Learning Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Learning
            </p>
            <div className="space-y-1">
              {learningItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Account Section */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Account
            </p>
            <div className="space-y-1">
              {accountItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Sign Out */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-all"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Top Header for Desktop */}
      <header className="hidden lg:flex fixed top-0 left-[280px] right-0 h-16 bg-white/80 backdrop-blur-sm border-b border-border z-30 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search courses, lessons..." 
              className="w-80 pl-10 pr-4 py-2 bg-muted rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="notification-badge">3</span>
          </Button>
          <div className="h-8 w-px bg-border" />
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground">{level}</p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
