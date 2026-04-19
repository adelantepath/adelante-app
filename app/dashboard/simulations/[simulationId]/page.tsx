'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  Gamepad2,
  Trophy,
  RotateCcw,
  Home
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Scenario {
  id: string
  prompt: string
  options: {
    id: string
    text: string
    is_correct: boolean
    feedback: string
    points: number
  }[]
}

interface Simulation {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  estimated_time: string
  scenarios: Scenario[]
  passing_score: number
}

interface PageProps {
  params: Promise<{ simulationId: string }>
}

export default function SimulationPlayerPage({ params }: PageProps) {
  const [simulation, setSimulation] = useState<Simulation | null>(null)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [resolvedParams, setResolvedParams] = useState<{ simulationId: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return
    
    async function loadSimulation() {
      const supabase = createClient()
      
      const { data } = await supabase
        .from('simulations')
        .select('*')
        .eq('id', resolvedParams.simulationId)
        .single()

      if (data) {
        // Parse scenarios if stored as JSON
        const scenarios = typeof data.scenarios === 'string' 
          ? JSON.parse(data.scenarios) 
          : data.scenarios || generateDemoScenarios(data.title)
        
        setSimulation({
          ...data,
          scenarios,
          passing_score: data.passing_score || 70
        })
        
        // Calculate total possible points
        const total = scenarios.reduce((sum: number, s: Scenario) => {
          const maxPoints = Math.max(...s.options.map(o => o.points || 0))
          return sum + maxPoints
        }, 0)
        setTotalPoints(total)
      }
      
      setLoading(false)
    }
    
    loadSimulation()
  }, [resolvedParams])

  function generateDemoScenarios(title: string): Scenario[] {
    // Generate demo scenarios based on simulation type
    return [
      {
        id: '1',
        prompt: `Welcome to "${title}"! This is a decision-based simulation where you'll practice real-world scenarios.\n\nScenario 1: You're starting your first day at a new job. Your manager asks you to introduce yourself to the team. What do you do?`,
        options: [
          { id: 'a', text: 'Give a brief, professional introduction with your name and role', is_correct: true, feedback: 'Great choice! A professional introduction helps establish a positive first impression.', points: 10 },
          { id: 'b', text: 'Share a long personal story about your background', is_correct: false, feedback: 'While it\'s good to be personable, keeping introductions concise is more professional in a work setting.', points: 3 },
          { id: 'c', text: 'Just wave and say "Hi"', is_correct: false, feedback: 'This might come across as dismissive. Taking time for a proper introduction shows respect.', points: 1 },
          { id: 'd', text: 'Ask someone else to introduce you', is_correct: false, feedback: 'It\'s better to take initiative and introduce yourself directly.', points: 2 }
        ]
      },
      {
        id: '2',
        prompt: 'Scenario 2: You made a mistake on an important project and your supervisor notices. How do you handle this?',
        options: [
          { id: 'a', text: 'Blame technical issues or other team members', is_correct: false, feedback: 'Deflecting blame damages trust and doesn\'t solve the problem.', points: 0 },
          { id: 'b', text: 'Acknowledge the mistake, explain what happened, and propose a solution', is_correct: true, feedback: 'Excellent! Taking responsibility and being solution-oriented shows maturity and professionalism.', points: 10 },
          { id: 'c', text: 'Try to hide the mistake and hope no one notices', is_correct: false, feedback: 'Hiding mistakes often leads to bigger problems later and damages trust.', points: 0 },
          { id: 'd', text: 'Apologize repeatedly without offering a solution', is_correct: false, feedback: 'While apologizing is important, focusing on solutions is more productive.', points: 4 }
        ]
      },
      {
        id: '3',
        prompt: 'Scenario 3: A colleague is consistently interrupting you during meetings. What\'s the best approach?',
        options: [
          { id: 'a', text: 'Interrupt them back to show how it feels', is_correct: false, feedback: 'This creates more conflict and doesn\'t address the issue professionally.', points: 0 },
          { id: 'b', text: 'Complain to your manager immediately', is_correct: false, feedback: 'It\'s usually better to address interpersonal issues directly first.', points: 2 },
          { id: 'c', text: 'Speak with them privately and politely express how the interruptions affect you', is_correct: true, feedback: 'Perfect! Direct, respectful communication is the best first step for resolving workplace conflicts.', points: 10 },
          { id: 'd', text: 'Stop contributing to meetings altogether', is_correct: false, feedback: 'Withdrawing doesn\'t solve the problem and may hurt your professional reputation.', points: 0 }
        ]
      }
    ]
  }

  async function handleOptionSelect(optionId: string) {
    if (showFeedback || !simulation) return
    
    setSelectedOption(optionId)
    setShowFeedback(true)
    
    const currentScenario = simulation.scenarios[currentScenarioIndex]
    const selected = currentScenario.options.find(o => o.id === optionId)
    
    if (selected) {
      setScore(prev => prev + (selected.points || 0))
    }
  }

  async function handleNext() {
    if (!simulation || !resolvedParams) return
    
    if (currentScenarioIndex < simulation.scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
    } else {
      // Simulation complete
      setIsComplete(true)
      
      // Save results
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const finalScore = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0
        
        await supabase.from('simulation_results').upsert({
          user_id: user.id,
          simulation_id: resolvedParams.simulationId,
          score: finalScore,
          completed_at: new Date().toISOString(),
          time_spent: '00:15:00', // TODO: Track actual time
          attempts: 1
        }, { onConflict: 'user_id,simulation_id' })
        
        // Update user stats
        await supabase.rpc('increment_user_stat', {
          p_user_id: user.id,
          p_stat: 'simulations_completed',
          p_amount: 1
        })
      }
    }
  }

  function handleRestart() {
    setCurrentScenarioIndex(0)
    setSelectedOption(null)
    setShowFeedback(false)
    setScore(0)
    setIsComplete(false)
  }

  if (loading || !resolvedParams) {
    return (
      <div className="flex items-center justify-center min-h-[400px] pt-16">
        <div className="size-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!simulation) {
    return (
      <div className="pt-16">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/simulations">
            <ArrowLeft className="size-4 mr-2" />
            Back to Simulations
          </Link>
        </Button>
        <p className="text-center text-muted-foreground mt-8">Simulation not found</p>
      </div>
    )
  }

  const currentScenario = simulation.scenarios[currentScenarioIndex]
  const progressPercent = ((currentScenarioIndex + (showFeedback ? 1 : 0)) / simulation.scenarios.length) * 100
  const finalScorePercent = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0
  const passed = finalScorePercent >= simulation.passing_score

  // Results screen
  if (isComplete) {
    return (
      <div className="space-y-6 pt-16 max-w-2xl mx-auto">
        <Card className="bg-card border-border text-center">
          <CardHeader>
            <div className={`mx-auto size-20 rounded-full flex items-center justify-center mb-4 ${
              passed ? 'bg-accent/10' : 'bg-destructive/10'
            }`}>
              {passed ? (
                <Trophy className="size-10 text-accent" />
              ) : (
                <XCircle className="size-10 text-destructive" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </CardTitle>
            <CardDescription>
              {passed 
                ? 'You passed this simulation!' 
                : `You need ${simulation.passing_score}% to pass. Try again!`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className={`text-5xl font-bold ${passed ? 'text-accent' : 'text-destructive'}`}>
                {finalScorePercent}%
              </p>
              <p className="text-muted-foreground mt-1">
                {score} / {totalPoints} points
              </p>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="size-4 mr-2" />
                Try Again
              </Button>
              <Button asChild>
                <Link href="/dashboard/simulations">
                  <Home className="size-4 mr-2" />
                  Back to Simulations
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/simulations">
            <ArrowLeft className="size-4 mr-2" />
            Exit Simulation
          </Link>
        </Button>
        
        <Badge variant={
          simulation.difficulty === 'beginner' ? 'secondary' :
          simulation.difficulty === 'intermediate' ? 'default' : 'destructive'
        }>
          {simulation.difficulty}
        </Badge>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Scenario {currentScenarioIndex + 1} of {simulation.scenarios.length}
          </span>
          <span className="font-medium text-foreground">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Scenario */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Gamepad2 className="size-5 text-accent" />
            </div>
            <CardTitle>{simulation.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-foreground">{currentScenario.prompt}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentScenario.options.map((option) => {
              const isSelected = selectedOption === option.id
              const showResult = showFeedback && isSelected
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showResult
                      ? option.is_correct
                        ? 'border-accent bg-accent/10'
                        : 'border-destructive bg-destructive/10'
                      : showFeedback && option.is_correct
                        ? 'border-accent bg-accent/5'
                        : isSelected
                          ? 'border-accent'
                          : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`size-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      showResult
                        ? option.is_correct
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-destructive bg-destructive text-destructive-foreground'
                        : showFeedback && option.is_correct
                          ? 'border-accent text-accent'
                          : 'border-current'
                    }`}>
                      {showResult ? (
                        option.is_correct ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />
                      ) : showFeedback && option.is_correct ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <span className="text-xs font-medium">{option.id.toUpperCase()}</span>
                      )}
                    </span>
                    <span className="text-foreground">{option.text}</span>
                  </div>
                  
                  {showFeedback && isSelected && (
                    <p className={`mt-3 text-sm ${option.is_correct ? 'text-accent' : 'text-destructive'}`}>
                      {option.feedback}
                    </p>
                  )}
                </button>
              )
            })}
          </div>

          {/* Continue button */}
          {showFeedback && (
            <div className="flex justify-end">
              <Button onClick={handleNext} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {currentScenarioIndex < simulation.scenarios.length - 1 ? (
                  <>
                    Next Scenario
                    <ArrowRight className="size-4 ml-2" />
                  </>
                ) : (
                  <>
                    See Results
                    <Trophy className="size-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score */}
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>Current Score: <strong className="text-foreground">{score}</strong> points</span>
      </div>
    </div>
  )
}
