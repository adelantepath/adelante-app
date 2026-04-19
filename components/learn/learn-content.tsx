'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react'
import type { LifeStage, Category, Module, UserProgress } from '@/lib/types'

interface LearnContentProps {
  stages: LifeStage[]
  categories: Category[]
  modules: (Module & { lessons: { id: string }[] })[]
  progress: UserProgress[]
}

export function LearnContent({
  stages,
  categories,
  modules,
  progress,
}: LearnContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

  // Calculate progress for each module
  const modulesWithProgress = modules.map(module => {
    const moduleLessonIds = module.lessons?.map(l => l.id) || []
    const completedCount = progress.filter(
      p => moduleLessonIds.includes(p.lesson_id) && p.status === 'completed'
    ).length
    const progressPercent = moduleLessonIds.length > 0 
      ? Math.round((completedCount / moduleLessonIds.length) * 100) 
      : 0
    return { ...module, progressPercent, completedCount }
  })

  // Filter modules
  const filteredModules = modulesWithProgress.filter(module => {
    const matchesSearch = !searchQuery || 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || module.category_id === selectedCategory
    const matchesStage = !selectedStage || module.stage_id === selectedStage
    return matchesSearch && matchesCategory && matchesStage
  })

  // Group by category
  const groupedByCategory = categories.map(category => ({
    category,
    modules: filteredModules.filter(m => m.category_id === category.id)
  })).filter(group => group.modules.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Learn</h1>
        <p className="text-muted-foreground">
          Browse modules and start building essential life skills
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stage Tabs */}
        <Tabs defaultValue="all" onValueChange={(v) => setSelectedStage(v === 'all' ? null : v)}>
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All Stages
            </TabsTrigger>
            {stages.map(stage => (
              <TabsTrigger 
                key={stage.id} 
                value={stage.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {stage.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              style={selectedCategory === category.id ? { backgroundColor: category.color || undefined } : {}}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredModules.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No modules found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByCategory.map(({ category, modules }) => (
            <section key={category.id}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: category.color || '#0d9488' }}
                >
                  {category.name[0]}
                </div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <Badge variant="secondary">{modules.length} modules</Badge>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((module) => (
                  <Card key={module.id} className="group hover:shadow-lg transition-all hover:-translate-y-1">
                    <Link href={`/learn/${module.slug}`}>
                      <CardContent className="p-0">
                        <div 
                          className="h-2 rounded-t-lg"
                          style={{ backgroundColor: category.color || '#0d9488' }}
                        />
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {module.title}
                            </h3>
                            <Badge variant="outline" className="shrink-0 ml-2">
                              {module.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {module.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{module.lessons?.length || 0} lessons</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.estimated_minutes} min</span>
                            </div>
                          </div>

                          {module.progressPercent > 0 && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{module.progressPercent}%</span>
                              </div>
                              <Progress value={module.progressPercent} className="h-1.5" />
                            </div>
                          )}

                          {module.progressPercent === 0 && (
                            <Button variant="ghost" size="sm" className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground">
                              Start Learning
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}

                          {module.progressPercent > 0 && module.progressPercent < 100 && (
                            <Button variant="ghost" size="sm" className="w-full mt-2 group-hover:bg-primary group-hover:text-primary-foreground">
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}

                          {module.progressPercent === 100 && (
                            <Button variant="ghost" size="sm" className="w-full mt-2 text-emerald-600">
                              Completed
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
