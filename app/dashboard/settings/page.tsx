'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bell, 
  Shield, 
  Users, 
  Building2, 
  Link as LinkIcon,
  Settings as SettingsIcon,
  LogOut,
  Loader2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Organization {
  id: string
  name: string
  type: string
  role: string
}

interface FamilyMember {
  id: string
  full_name: string | null
  email: string | null
  role: string
  relationship: string
}

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [notifications, setNotifications] = useState({
    email: true,
    progress: true,
    achievements: true,
    reminders: true
  })

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Fetch organization memberships
        const { data: orgMemberships } = await supabase
          .from('organization_members')
          .select('role, organizations(id, name, type)')
          .eq('user_id', user.id)

        if (orgMemberships) {
          setOrganizations(orgMemberships.map(m => ({
            id: m.organizations.id,
            name: m.organizations.name,
            type: m.organizations.type,
            role: m.role
          })))
        }

        // Fetch family members (if user is a parent)
        const { data: family } = await supabase
          .from('family_members')
          .select('relationship, child:profiles!family_members_child_id_fkey(id, full_name, email, role), parent:profiles!family_members_parent_id_fkey(id, full_name, email, role)')
          .or(`parent_id.eq.${user.id},child_id.eq.${user.id}`)

        if (family) {
          const members: FamilyMember[] = family.map(f => {
            const member = f.child?.id === user.id ? f.parent : f.child
            return {
              id: member?.id || '',
              full_name: member?.full_name,
              email: member?.email,
              role: member?.role || 'student',
              relationship: f.relationship
            }
          }).filter(m => m.id)
          setFamilyMembers(members)
        }
      }

      setLoading(false)
    }

    loadData()
  }, [])

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-16">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-16 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="size-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="organizations" className="flex items-center gap-2">
            <Building2 className="size-4" />
            <span className="hidden sm:inline">Organizations</span>
          </TabsTrigger>
          <TabsTrigger value="family" className="flex items-center gap-2">
            <Users className="size-4" />
            <span className="hidden sm:inline">Family</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="size-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, email: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when courses or lessons are completed
                  </p>
                </div>
                <Switch 
                  checked={notifications.progress}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, progress: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when you earn achievements
                  </p>
                </div>
                <Switch 
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, achievements: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Learning Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily reminders to continue learning
                  </p>
                </div>
                <Switch 
                  checked={notifications.reminders}
                  onCheckedChange={(checked) => setNotifications(n => ({ ...n, reminders: checked }))}
                />
              </div>

              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Organization Memberships</CardTitle>
              <CardDescription>Schools and organizations you belong to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organizations.length > 0 ? (
                organizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Building2 className="size-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{org.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{org.type}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">{org.role}</Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Building2 className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No organization memberships</p>
                  <Button variant="outline">
                    <LinkIcon className="size-4 mr-2" />
                    Join an Organization
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Family Members</CardTitle>
              <CardDescription>Manage linked family accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {familyMembers.length > 0 ? (
                familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                        <Users className="size-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">{member.relationship}</Badge>
                      <Badge variant="secondary" className="capitalize">{member.role}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="size-10 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">No family members linked</p>
                  <Button variant="outline">
                    <LinkIcon className="size-4 mr-2" />
                    Link a Family Member
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Change Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Update your account password
                  </p>
                </div>
                <Button variant="outline">Change</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download your learning data and progress
                  </p>
                </div>
                <Button variant="outline">Export</Button>
              </div>

              <div className="pt-6 border-t border-border">
                <Button variant="destructive" onClick={handleSignOut}>
                  <LogOut className="size-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
