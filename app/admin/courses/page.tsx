"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BookOpen, Search, Plus, Clock, Users, MoreHorizontal, Eye, EyeOff } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Placeholder data - will be replaced with real data from Supabase
const courses = [
  {
    id: "1",
    title: "Financial Literacy Foundations",
    category: "Financial Literacy",
    stage: "high_to_adult",
    modules: 8,
    lessons: 32,
    enrolled: 1245,
    hours: 12,
    isPublished: true,
  },
  {
    id: "2",
    title: "Digital Marketing Essentials",
    category: "Digital Marketing",
    stage: "adult_skills",
    modules: 6,
    lessons: 24,
    enrolled: 892,
    hours: 10,
    isPublished: true,
  },
  {
    id: "3",
    title: "Middle School Transition Guide",
    category: "Life Transitions",
    stage: "elementary_to_middle",
    modules: 5,
    lessons: 20,
    enrolled: 2103,
    hours: 6,
    isPublished: true,
  },
  {
    id: "4",
    title: "AI & Technology Basics",
    category: "Tech/AI",
    stage: "middle_to_high",
    modules: 7,
    lessons: 28,
    enrolled: 0,
    hours: 14,
    isPublished: false,
  },
  {
    id: "5",
    title: "Emotional Intelligence for Teens",
    category: "EQ/Leadership",
    stage: "middle_to_high",
    modules: 4,
    lessons: 16,
    enrolled: 567,
    hours: 8,
    isPublished: true,
  },
]

const stageLabels: Record<string, string> = {
  elementary_to_middle: "Ages 10-12",
  middle_to_high: "Ages 13-15",
  high_to_adult: "Ages 16-18",
  adult_skills: "Ages 18+",
  all: "All Ages",
}

const categoryColors: Record<string, string> = {
  "Financial Literacy": "bg-emerald-100 text-emerald-800",
  "Digital Marketing": "bg-blue-100 text-blue-800",
  "Life Transitions": "bg-purple-100 text-purple-800",
  "Tech/AI": "bg-orange-100 text-orange-800",
  "EQ/Leadership": "bg-pink-100 text-pink-800",
}

export default function AdminCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && course.isPublished) ||
      (statusFilter === "draft" && !course.isPublished)
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">
            Create and manage learning content
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Plus className="size-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Courses</CardDescription>
            <CardTitle className="text-2xl">{courses.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Published</CardDescription>
            <CardTitle className="text-2xl">
              {courses.filter((c) => c.isPublished).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Lessons</CardDescription>
            <CardTitle className="text-2xl">
              {courses.reduce((sum, c) => sum + c.lessons, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Enrollments</CardDescription>
            <CardTitle className="text-2xl">
              {courses.reduce((sum, c) => sum + c.enrolled, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Financial Literacy">Financial Literacy</SelectItem>
                <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                <SelectItem value="Life Transitions">Life Transitions</SelectItem>
                <SelectItem value="Tech/AI">Tech/AI</SelectItem>
                <SelectItem value="EQ/Leadership">EQ/Leadership</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Age Group</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
                          <BookOpen className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {course.hours} hours
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={categoryColors[course.category] || "bg-gray-100"}
                      >
                        {course.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {stageLabels[course.stage]}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{course.modules} modules</p>
                        <p className="text-muted-foreground">{course.lessons} lessons</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="size-4 text-muted-foreground" />
                        {course.enrolled.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {course.isPublished ? (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          <Eye className="size-3 mr-1" />
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="size-3 mr-1" />
                          Draft
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Course</DropdownMenuItem>
                          <DropdownMenuItem>Manage Modules</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>
                            {course.isPublished ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
