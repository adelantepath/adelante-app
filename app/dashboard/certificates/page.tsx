import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Download, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function CertificatesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user's certificates
  const { data: certificates } = await supabase
    .from('certificates')
    .select('*, courses(title, description)')
    .eq('user_id', user?.id)
    .order('issued_at', { ascending: false })

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Certificates</h1>
        <p className="text-muted-foreground mt-1">
          Your earned course completion certificates
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {certificates && certificates.length > 0 ? (
          certificates.map((cert) => (
            <Card key={cert.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="size-6 text-accent" />
                  </div>
                  <Badge variant="secondary">
                    {new Date(cert.issued_at).toLocaleDateString()}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-4">{cert.courses?.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {cert.courses?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>Certificate ID: {cert.id.slice(0, 8)}</span>
                </div>
                <div className="flex gap-2">
                  {cert.certificate_url && (
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={cert.certificate_url} target="_blank">
                        <ExternalLink className="size-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  )}
                  <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <GraduationCap className="size-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No certificates yet</h3>
                <p className="text-muted-foreground text-center max-w-sm mb-4">
                  Complete courses to earn certificates that you can share with employers and schools.
                </p>
                <Button asChild>
                  <Link href="/dashboard/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
