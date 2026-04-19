'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { LogOut, Settings } from 'lucide-react'
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Trophy,
  User,
  GraduationCap,
  HelpCircle,
} from 'lucide-react'

const learningItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Learning',
    href: '/dashboard/courses',
    icon: BookOpen,
  },
  {
    label: 'Achievements',
    href: '/dashboard/achievements',
    icon: Trophy,
  },
  {
    label: 'Certifications',
    href: '/dashboard/certificates',
    icon: GraduationCap,
  },
  {
    label: 'Simulations',
    href: '/dashboard/simulations',
    icon: Gamepad2,
  },
]

const accountItems = [
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
  {
    label: 'Support',
    href: '/dashboard/support',
    icon: HelpCircle,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r-2 border-border hidden lg:flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      {/* User Avatar Section */}
      <div className="p-6 flex flex-col items-center border-b border-border">
        <div className="size-20 rounded-full bg-accent/20 border-4 border-accent/30 flex items-center justify-center mb-3">
          <span className="text-3xl">👤</span>
        </div>
        <p className="font-semibold text-foreground">Student</p>
        <p className="text-sm text-muted-foreground">Level 1</p>
      </div>

      {/* Learning Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
          Learning
        </p>
        <nav className="space-y-1">
          {learningItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3 mt-8">
          Account
        </p>
        <nav className="space-y-1">
          {accountItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-border">
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-colors"
          >
            <LogOut className="size-5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
