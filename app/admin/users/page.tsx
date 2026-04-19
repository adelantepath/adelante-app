import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search,
  MoreHorizontal,
  Mail,
  Calendar
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  // Fetch all users with their stats
  const { data: users } = await supabase
    .from('profiles')
    .select('*, user_stats(total_xp, courses_completed, simulations_completed)')
    .order('created_at', { ascending: false })

  const roleColors: Record<string, string> = {
    student: 'bg-chart-2/10 text-chart-2',
    parent: 'bg-chart-3/10 text-chart-3',
    instructor: 'bg-accent/10 text-accent',
    org_admin: 'bg-primary/10 text-primary',
    super_admin: 'bg-destructive/10 text-destructive'
  }

  return (
    <div className="space-y-6 pt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage platform users and permissions
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search users by name or email..." 
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>{users?.length || 0} total users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
                        {(user.full_name || user.email || '?').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {user.full_name || 'Unnamed User'}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-medium text-foreground">
                          {user.user_stats?.[0]?.total_xp || 0}
                        </p>
                        <p className="text-muted-foreground text-xs">XP</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-foreground">
                          {user.user_stats?.[0]?.courses_completed || 0}
                        </p>
                        <p className="text-muted-foreground text-xs">Courses</p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className={`capitalize ${roleColors[user.role] || ''}`}
                    >
                      {user.role.replace('_', ' ')}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Users className="size-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
                <p className="text-muted-foreground">Users will appear here once they sign up</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
