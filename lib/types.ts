export interface LifeStage {
  id: string
  name: string
  slug: string
  description: string | null
  min_age: number | null
  max_age: number | null
  order_index: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  order_index: number
}

export interface Module {
  id: string
  stage_id: string
  category_id: string
  title: string
  slug: string
  description: string | null
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_minutes: number | null
  order_index: number
  is_published: boolean
  category?: Category
  stage?: LifeStage
  lessons?: Lesson[]
  progress?: number
}

export interface Lesson {
  id: string
  module_id: string
  title: string
  slug: string
  content: LessonContent | null
  lesson_type: 'content' | 'simulation' | 'quiz' | 'interactive'
  order_index: number
  estimated_minutes: number | null
  is_published: boolean
  module?: Module
  user_progress?: UserProgress
}

export interface LessonContent {
  sections: ContentSection[]
  intro?: string
  simulation_type?: string
}

export interface ContentSection {
  type: 'text' | 'key_points' | 'real_world' | 'comparison' | 'tip' | 'warning' | 'do_dont' | 'math_example' | 'breakdown' | 'scale' | 'steps' | 'strategy' | 'deadline' | 'action' | 'example'
  content?: string
  title?: string
  points?: string[]
  description?: string
  features?: string[]
  items?: Array<{ name: string; cost?: string; description?: string; percentage?: number; tip?: string }>
  do?: string[]
  dont?: string[]
  scenario?: string
  result?: string
  comparisons?: Array<{ age: number; by_65: string }>
  conclusion?: string
  ranges?: Array<{ range: string; label: string; description: string }>
  factors?: Array<{ name: string; percentage: number; tip: string }>
  steps?: Array<{ step: number; title: string; details: string }>
}

export interface Simulation {
  id: string
  lesson_id: string
  title: string
  description: string | null
  simulation_type: 'budget' | 'decision_tree' | 'scenario' | 'calculator'
  config: SimulationConfig
}

export interface SimulationConfig {
  income?: number
  expenses?: Array<{ name: string; amount: number; required: boolean }>
  scenarios?: Array<{ id: string; text: string; choices: SimulationChoice[] }>
}

export interface SimulationChoice {
  id: string
  text: string
  consequence: string
  impact: { score?: number; money?: number }
  next_scenario?: string
}

export interface Profile {
  id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  role: 'student' | 'parent' | 'educator' | 'admin'
  date_of_birth: string | null
  current_stage_id: string | null
  organization_id: string | null
  onboarding_completed: boolean
  preferences: Record<string, unknown>
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  score: number | null
  time_spent_seconds: number
  completed_at: string | null
}

export interface SimulationResult {
  id: string
  user_id: string
  simulation_id: string
  choices: Record<string, unknown>
  outcome: Record<string, unknown>
  score: number | null
  completed_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string | null
  icon: string | null
  criteria: Record<string, unknown>
  points: number
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  achievement?: Achievement
}
