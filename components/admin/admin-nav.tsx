'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Gamepad2,
  Building2,
  BarChart3,
  Settings,
  Trophy
} from 'lucide-react'

const navItems = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['super_admin', 'org_admin']
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
    roles: ['super_admin', 'org_admin']
  },
  {
    label: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
    roles: ['super_admin']
  },
  {
    label: 'Simulations',
    href: '/admin/simulations',
    icon: Gamepad2,
    roles: ['super_admin']
  },
  {
    label: 'Achievements',
    href: '/admin/achievements',
    icon: Trophy,
    roles: ['super_admin']
  },
  {
    label: 'Organizations',
    href: '/admin/organizations',
    icon: Building2,
    roles: ['super_admin']
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'org_admin']
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['super_admin']
  },
]

interface AdminNavProps {
  role: string
}

export function AdminNav({ role }: AdminNavProps) {
  const pathname = usePathname()
  const filteredItems = navItems.filter(item => item.roles.includes(role))

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-border bg-card hidden lg:block">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
