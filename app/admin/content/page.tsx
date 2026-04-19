"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Gamepad2, Search, Plus, Trophy, FileText, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Placeholder data
const simulations = [
  {
    id: "1",
    name: "Monthly Budget Challenge",
    type: "budget",
    difficulty: "medium",
    plays: 3421,
    avgScore: 78,
    isStandalone: true,
  },
  {
    id: "2",
    name: "Tax Filing Simulator",
    type: "tax_filing",
    difficulty: "hard",
    plays: 1892,
    avgScore: 65,
    isStandalone: true,
  },
  {
    id: "3",
    name: "Job Interview Practice",
    type: "interview",
    difficulty: "medium",
    plays: 2567,
    avgScore: 72,
    isStandalone: true,
  },
  {
    id: "4",
    name: "Credit Score Builder",
    type: "credit_score",
    difficulty: "easy",
    plays: 4103,
    avgScore: 85,
    isStandalone: true,
  },
]

const achievements = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first lesson",
    category: "progress",
    xp: 25,
    earned: 8542,
  },
  {
    id: "2",
    name: "Budget Master",
    description: "Score 90%+ on the budget simulation",
    category: "simulation",
    xp: 100,
    earned: 1234,
  },
  {
    id: "3",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    category: "streak",
    xp: 75,
    earned: 3456,
  },
  {
    id: "4",
    name: "Course Champion",
    description: "Complete any full course",
    category: "progress",
    xp: 200,
    earned: 892,
  },
]

const typeColors: Record<string, string> = {
  budget: "bg-emerald-100 text-emerald-800",
  tax_filing: "bg-blue-100 text-blue-800",
  interview: "bg-purple-100 text-purple-800",
  credit_score: "bg-orange-100 text-orange-800",
  investing: "bg-pink-100 text-pink-800",
}

const categoryColors: Record<string, string> = {
  progress: "bg-blue-100 text-blue-800",
  simulation: "bg-emerald-100 text-emerald-800",
  streak: "bg-orange-100 text-orange-800",
  skill: "bg-purple-100 text-purple-800",
}

export default function AdminContentPage() {
  const [simSearchQuery, setSimSearchQuery] = useState("")
  const [achSearchQuery, setAchSearchQuery] = useState("")

  const filteredSimulations = simulations.filter((sim) =>
    sim.name.toLowerCase().includes(simSearchQuery.toLowerCase())
  )

  const filteredAchievements = achievements.filter((ach) =>
    ach.name.toLowerCase().includes(achSearchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
        <p className="text-muted-foreground">
          Manage simulations, achievements, and other content
        </p>
      </div>

      <Tabs defaultValue="simulations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="simulations" className="gap-2">
            <Gamepad2 className="size-4" />
            Simulations
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Trophy className="size-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulations" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Simulations</CardDescription>
                <CardTitle className="text-2xl">{simulations.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Plays</CardDescription>
                <CardTitle className="text-2xl">
                  {simulations.reduce((sum, s) => sum + s.plays, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg. Score</CardDescription>
                <CardTitle className="text-2xl">
                  {Math.round(
                    simulations.reduce((sum, s) => sum + s.avgScore, 0) / simulations.length
                  )}
                  %
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Most Played</CardDescription>
                <CardTitle className="text-lg truncate">Credit Score Builder</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">All Simulations</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="size-4 mr-2" />
                Create Simulation
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search simulations..."
                  value={simSearchQuery}
                  onChange={(e) => setSimSearchQuery(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Simulation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Total Plays</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSimulations.map((sim) => (
                      <TableRow key={sim.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
                              <Gamepad2 className="size-5 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{sim.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={typeColors[sim.type]}>
                            {sim.type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{sim.difficulty}</TableCell>
                        <TableCell>{sim.plays.toLocaleString()}</TableCell>
                        <TableCell>{sim.avgScore}%</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Simulation</DropdownMenuItem>
                              <DropdownMenuItem>View Analytics</DropdownMenuItem>
                              <DropdownMenuItem>Preview</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Achievements</CardDescription>
                <CardTitle className="text-2xl">{achievements.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Earned</CardDescription>
                <CardTitle className="text-2xl">
                  {achievements.reduce((sum, a) => sum + a.earned, 0).toLocaleString()}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total XP Available</CardDescription>
                <CardTitle className="text-2xl">
                  {achievements.reduce((sum, a) => sum + a.xp, 0)}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Most Earned</CardDescription>
                <CardTitle className="text-lg truncate">First Steps</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">All Achievements</CardTitle>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="size-4 mr-2" />
                Create Achievement
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search achievements..."
                  value={achSearchQuery}
                  onChange={(e) => setAchSearchQuery(e.target.value)}
                  className="pl-10 max-w-md"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>XP Reward</TableHead>
                      <TableHead>Times Earned</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAchievements.map((ach) => (
                      <TableRow key={ach.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-amber-100 flex items-center justify-center">
                              <Trophy className="size-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-medium">{ach.name}</p>
                              <p className="text-sm text-muted-foreground">{ach.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={categoryColors[ach.category]}>
                            {ach.category}
                          </Badge>
                        </TableCell>
                        <TableCell>+{ach.xp} XP</TableCell>
                        <TableCell>{ach.earned.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Achievement</DropdownMenuItem>
                              <DropdownMenuItem>View Criteria</DropdownMenuItem>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
