"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const stages = [
  {
    id: "elementary",
    title: "Elementary to Middle",
    subtitle: "Ages 10-12",
    focus: "Building Independence & Organization",
    color: "bg-chart-3",
    description: "Preparing for the big jump to middle school with age-appropriate skills.",
    modules: [
      "Organizing your locker and backpack",
      "Managing homework with multiple teachers",
      "Reading schedules and being on time",
      "Making friends in new environments",
      "Basic money: allowance and saving"
    ],
    microSkills: [
      "Pack your backpack the night before",
      "Write down all homework assignments",
      "Introduce yourself to someone new"
    ],
    skillCategories: ["Organization", "Social Skills", "Time Management"]
  },
  {
    id: "middle",
    title: "Middle to High School",
    subtitle: "Ages 13-15",
    focus: "Responsibility, Identity & Digital Life",
    color: "bg-chart-2",
    description: "Building habits that set the foundation for academic and personal success.",
    modules: [
      "Understanding GPA and why it matters",
      "Choosing extracurriculars strategically",
      "Digital footprint and online safety",
      "Communication: texts, emails, and conversations",
      "Intro to emotional intelligence"
    ],
    microSkills: [
      "Create a study schedule you can stick to",
      "Write a professional email to a teacher",
      "Set one personal goal and track it"
    ],
    skillCategories: ["Communication", "EQ Basics", "Digital Literacy"]
  },
  {
    id: "highschool",
    title: "High School to Adulthood",
    subtitle: "Ages 16-18",
    focus: "Real-World Preparation",
    color: "bg-accent",
    description: "Mastering the skills needed for independence after graduation.",
    modules: [
      "Banking, credit cards, and building credit",
      "Filing taxes and understanding W-2s",
      "Budgeting: rent, groceries, and bills",
      "Job applications and interview skills",
      "Intro to investing and retirement"
    ],
    microSkills: [
      "Open a checking and savings account",
      "Complete a mock tax return",
      "Create a monthly budget spreadsheet"
    ],
    skillCategories: ["Financial Literacy", "Career Prep", "Adulting 101"]
  },
  {
    id: "adult",
    title: "Career & Professional Skills",
    subtitle: "Ages 18+",
    focus: "Workplace Success & Growth",
    color: "bg-primary",
    description: "Advanced skills for thriving in your career and personal life.",
    modules: [
      "Sales fundamentals and persuasion",
      "Digital marketing and personal branding",
      "Tech literacy and AI tools",
      "Data basics: spreadsheets and analytics",
      "Leadership and emotional intelligence"
    ],
    microSkills: [
      "Build a LinkedIn profile that stands out",
      "Use AI tools to boost productivity",
      "Give and receive constructive feedback"
    ],
    skillCategories: ["Sales", "Marketing", "Tech/AI", "Data", "Leadership"]
  }
]

export function LifeStages() {
  const [activeStage, setActiveStage] = useState("highschool")

  const currentStage = stages.find(s => s.id === activeStage)!

  return (
    <section id="stages" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Four pathways. One system.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every age group learns differently. We tailor content to meet them where they are.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl border transition-all text-sm",
                activeStage === stage.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-accent/50"
              )}
            >
              <span className="font-medium">{stage.title}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("size-3 rounded-full", currentStage.color)} />
                <Badge variant="secondary">{currentStage.subtitle}</Badge>
              </div>
              <CardTitle className="text-2xl">{currentStage.title}</CardTitle>
              <CardDescription className="text-base">
                {currentStage.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {currentStage.skillCategories.map((cat) => (
                  <span key={cat} className="px-2.5 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border">
                    {cat}
                  </span>
                ))}
              </div>
              <h4 className="font-medium text-foreground mb-4">Core Modules</h4>
              <ul className="space-y-3">
                {currentStage.modules.map((module) => (
                  <li key={module} className="flex items-start gap-3">
                    <div className={cn("size-2 rounded-full mt-2 flex-shrink-0", currentStage.color)} />
                    <span className="text-muted-foreground">{module}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl">Micro-Skills</CardTitle>
              <CardDescription>
                Quick, actionable tasks that build real habits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStage.microSkills.map((skill, index) => (
                  <div 
                    key={skill} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border"
                  >
                    <div className={cn(
                      "size-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                      currentStage.color,
                      "text-white"
                    )}>
                      {index + 1}
                    </div>
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-medium">Learning Method:</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  1. Explain (short) → 2. Show (real example) → 3. Do (interactive task)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
