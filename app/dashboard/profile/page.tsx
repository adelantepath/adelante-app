'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  role: string
  age_group: string | null
  phone: string | null
  updated_at: string | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (data) {
        setProfile(data)
      } else {
        // Create profile if it doesn't exist
        setProfile({
          id: user.id,
          email: user.email || null,
          full_name: null,
          avatar_url: null,
          role: 'student',
          age_group: null,
          phone: null,
          updated_at: null,
        })
      }
    }
    setLoading(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    setMessage(null)

    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        full_name: profile.full_name,
        age_group: profile.age_group,
        phone: profile.phone,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      setMessage({ type: 'error', text: 'Failed to save profile. Please try again.' })
    } else {
      setMessage({ type: 'success', text: 'Profile saved successfully!' })
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-16">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-16 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.email || ''}
                  disabled
                  className="bg-secondary"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={profile?.full_name || ''}
                  onChange={(e) => setProfile(p => p ? { ...p, full_name: e.target.value } : null)}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile?.phone || ''}
                  onChange={(e) => setProfile(p => p ? { ...p, phone: e.target.value } : null)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ageGroup">Age Group</Label>
                <Select
                  value={profile?.age_group || ''}
                  onValueChange={(value) => setProfile(p => p ? { ...p, age_group: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Ages 10-12 (Elementary to Middle)</SelectItem>
                    <SelectItem value="middle">Ages 13-15 (Middle to High School)</SelectItem>
                    <SelectItem value="highschool">Ages 16-18 (High School to Adulthood)</SelectItem>
                    <SelectItem value="adult">Ages 18+ (Career & Professional)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  This helps us recommend the right courses and content for you
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Role</Label>
                <Input
                  value={profile?.role === 'student' ? 'Student' : 
                         profile?.role === 'parent' ? 'Parent' :
                         profile?.role === 'instructor' ? 'Instructor' :
                         profile?.role === 'org_admin' ? 'Organization Admin' :
                         profile?.role === 'super_admin' ? 'Super Admin' : 'Student'}
                  disabled
                  className="bg-secondary"
                />
              </div>
            </div>

            {message && (
              <p className={`text-sm ${message.type === 'error' ? 'text-destructive' : 'text-accent'}`}>
                {message.text}
              </p>
            )}

            <Button type="submit" disabled={saving} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {saving ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
