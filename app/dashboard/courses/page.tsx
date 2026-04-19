import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, ArrowRight, Users } from 'lucide-react'
import Link from 'next/link'

export default async function CoursesPage() {
  const supabase = await createClient()

  // Fetch all published courses with categories
  const { data: courses } = await supabase
    .from('courses')
    .select('*, course_categories(name, color)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  // Fetch categories for filtering
  const { data: categories } = await supabase
    .from('course_categories')
    .select('*')
    .order('name')

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Courses</h1>
        <p className="text-muted-foreground mt-1">
          Browse our library of life skills courses
        </p>
      </div>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">
            All Courses
          </Badge>
          {categories.map((cat) => (
            <Badge key={cat.id} variant="outline" className="cursor-pointer hover:bg-secondary">
              {cat.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <Card key={course.id} className="bg-card border-border group hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {course.course_categories && (
                    <Badge variant="secondary" className="text-xs">
                      {course.course_categories.name}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {course.age_group === 'elementary' ? 'Ages 10-12' :
                     course.age_group === 'middle' ? 'Ages 13-15' :
                     course.age_group === 'highschool' ? 'Ages 16-18' :
                     course.age_group === 'adult' ? 'Ages 18+' : 'All Ages'}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-accent transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="size-4" />
                    <span>{course.total_modules || 0} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span>{course.estimated_duration || '1h'}</span>
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href={`/dashboard/courses/${course.id}`}>
                    Start Course
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="size-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No courses available yet</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  We&apos;re building our course library. Check back soon for new content!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
