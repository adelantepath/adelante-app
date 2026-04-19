'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ArrowRight, 
  DollarSign, 
  Home, 
  Car, 
  ShoppingBag, 
  Utensils,
  Wifi,
  Smartphone,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface BudgetCategory {
  id: string
  name: string
  icon: React.ElementType
  min: number
  max: number
  recommended: number
  value: number
  description: string
}

interface Scenario {
  id: string
  title: string
  description: string
  choices: {
    id: string
    label: string
    impact: number
    consequence: string
  }[]
}

const initialBudget: BudgetCategory[] = [
  { id: 'rent', name: 'Rent', icon: Home, min: 0, max: 1500, recommended: 750, value: 750, description: 'Monthly housing cost' },
  { id: 'utilities', name: 'Utilities', icon: Wifi, min: 0, max: 300, recommended: 100, value: 100, description: 'Electric, water, gas' },
  { id: 'transportation', name: 'Transportation', icon: Car, min: 0, max: 500, recommended: 200, value: 200, description: 'Gas, insurance, or transit' },
  { id: 'groceries', name: 'Groceries', icon: Utensils, min: 0, max: 600, recommended: 300, value: 300, description: 'Food and household items' },
  { id: 'phone', name: 'Phone', icon: Smartphone, min: 0, max: 150, recommended: 50, value: 50, description: 'Mobile phone bill' },
  { id: 'shopping', name: 'Shopping', icon: ShoppingBag, min: 0, max: 400, recommended: 100, value: 100, description: 'Clothes, entertainment' },
  { id: 'savings', name: 'Savings', icon: PiggyBank, min: 0, max: 500, recommended: 250, value: 250, description: 'Emergency fund' },
]

const scenarios: Scenario[] = [
  {
    id: 'car-repair',
    title: 'Unexpected Car Repair',
    description: 'Your car breaks down and needs a $400 repair. You need it for work.',
    choices: [
      { id: 'savings', label: 'Use emergency savings', impact: -400, consequence: 'Good choice! This is exactly what emergency savings are for.' },
      { id: 'credit', label: 'Put it on a credit card', impact: -480, consequence: 'You will pay $80 in interest over the next few months.' },
      { id: 'skip', label: 'Skip rent to pay for it', impact: -50, consequence: 'Late fees on rent and potential eviction risk. Very dangerous!' },
    ]
  },
  {
    id: 'overtime',
    title: 'Extra Work Opportunity',
    description: 'Your job offers overtime. You can earn an extra $300 this month.',
    choices: [
      { id: 'save', label: 'Save all of it', impact: 300, consequence: 'Great discipline! Your emergency fund is growing.' },
      { id: 'split', label: 'Save half, spend half', impact: 150, consequence: 'Balanced approach. You enjoyed some reward while saving.' },
      { id: 'spend', label: 'Treat yourself', impact: 0, consequence: 'Fun in the moment, but no long-term benefit.' },
    ]
  },
  {
    id: 'sale',
    title: 'Flash Sale Temptation',
    description: 'Your favorite store has a 50% off sale. Those items you wanted are now affordable.',
    choices: [
      { id: 'skip', label: 'Stick to your budget', impact: 50, consequence: 'Excellent self-control! You saved money for what matters.' },
      { id: 'small', label: 'Buy one small item', impact: -30, consequence: 'A small indulgence within reason.' },
      { id: 'splurge', label: 'Buy everything you wanted', impact: -200, consequence: 'You overspent and went over budget.' },
    ]
  },
]

export function BudgetSimulation() {
  const [step, setStep] = useState<'intro' | 'budget' | 'scenarios' | 'results'>('intro')
  const [budget, setBudget] = useState<BudgetCategory[]>(initialBudget)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [scenarioResults, setScenarioResults] = useState<{id: string; choiceId: string; impact: number}[]>([])
  const [monthlyIncome] = useState(2500)

  const totalExpenses = budget.reduce((sum, cat) => sum + cat.value, 0)
  const remaining = monthlyIncome - totalExpenses
  const savingsAmount = budget.find(b => b.id === 'savings')?.value || 0

  const handleBudgetChange = (id: string, value: number[]) => {
    setBudget(prev => prev.map(cat => 
      cat.id === id ? { ...cat, value: value[0] } : cat
    ))
  }

  const handleScenarioChoice = (choiceId: string) => {
    const scenario = scenarios[currentScenario]
    const choice = scenario.choices.find(c => c.id === choiceId)
    if (!choice) return

    setScenarioResults(prev => [...prev, {
      id: scenario.id,
      choiceId,
      impact: choice.impact
    }])

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
    } else {
      setStep('results')
    }
  }

  const calculateFinalScore = () => {
    const budgetScore = remaining >= 0 ? 30 : 0
    const savingsScore = savingsAmount >= 200 ? 30 : (savingsAmount / 200) * 30
    const scenarioScore = scenarioResults.reduce((sum, r) => sum + (r.impact > 0 ? 20 : r.impact >= -100 ? 10 : 0), 0) / scenarios.length
    return Math.round(budgetScore + savingsScore + scenarioScore)
  }

  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/simulations" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Simulations
        </Link>

        <Card className="border-border">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
              <DollarSign className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">Monthly Budget Challenge</CardTitle>
            <CardDescription className="text-base">
              Learn to manage a real monthly budget and handle unexpected situations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">The Scenario</h3>
              <p className="text-muted-foreground">
                You just got your first full-time job earning <span className="font-bold text-primary">${monthlyIncome}/month</span> after taxes. 
                You need to create a budget that covers all your expenses while building savings.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">What You Will Learn</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>How to allocate income across essential expenses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>The importance of emergency savings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>How to handle unexpected expenses</span>
                </li>
              </ul>
            </div>

            <Button size="lg" className="w-full" onClick={() => setStep('budget')}>
              Start Simulation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 'budget') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Create Your Budget</h1>
          <Badge variant="outline" className="text-base px-3 py-1">
            Step 1 of 2
          </Badge>
        </div>

        {/* Income & Remaining */}
        <Card className={`border-2 ${remaining >= 0 ? 'border-green-500/30 bg-green-50/50' : 'border-red-500/30 bg-red-50/50'}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold">${monthlyIncome}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${remaining}
                </p>
              </div>
            </div>
            {remaining < 0 && (
              <div className="flex items-center gap-2 mt-3 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>You are over budget! Reduce some expenses.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Budget Categories */}
        <div className="space-y-4">
          {budget.map((category) => (
            <Card key={category.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${category.value}</p>
                    <p className="text-xs text-muted-foreground">
                      Suggested: ${category.recommended}
                    </p>
                  </div>
                </div>
                <Slider
                  value={[category.value]}
                  onValueChange={(value) => handleBudgetChange(category.id, value)}
                  min={category.min}
                  max={category.max}
                  step={10}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep('intro')} className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={() => setStep('scenarios')} 
            className="flex-1"
            disabled={remaining < 0}
          >
            Continue to Scenarios
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  if (step === 'scenarios') {
    const scenario = scenarios[currentScenario]
    
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Life Happens</h1>
          <Badge variant="outline" className="text-base px-3 py-1">
            Step 2 of 2 - Scenario {currentScenario + 1}/{scenarios.length}
          </Badge>
        </div>

        <Progress value={((currentScenario + 1) / scenarios.length) * 100} className="h-2" />

        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Scenario</span>
            </div>
            <CardTitle className="text-xl">{scenario.title}</CardTitle>
            <CardDescription className="text-base">
              {scenario.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenario.choices.map((choice) => (
              <Button
                key={choice.id}
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => handleScenarioChoice(choice.id)}
              >
                <span>{choice.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Show consequence of last choice */}
        {scenarioResults.length > 0 && currentScenario > 0 && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm">
                <span className="font-semibold">Previous choice: </span>
                {scenarios[currentScenario - 1].choices.find(
                  c => c.id === scenarioResults[scenarioResults.length - 1].choiceId
                )?.consequence}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (step === 'results') {
    const score = calculateFinalScore()
    const totalImpact = scenarioResults.reduce((sum, r) => sum + r.impact, 0)
    const finalSavings = savingsAmount + totalImpact

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full mb-4 ${
            score >= 70 ? 'bg-green-500/10 text-green-600' : 
            score >= 40 ? 'bg-amber-500/10 text-amber-600' : 
            'bg-red-500/10 text-red-600'
          }`}>
            {score >= 70 ? (
              <CheckCircle2 className="h-10 w-10" />
            ) : (
              <AlertTriangle className="h-10 w-10" />
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">Simulation Complete!</h1>
          <p className="text-muted-foreground">Here is how you did this month</p>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl font-bold text-primary">{score}/100</CardTitle>
            <CardDescription>Your Financial Health Score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">Monthly Budget</p>
                <p className={`text-xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {remaining >= 0 ? 'Balanced' : 'Over Budget'}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">Final Savings</p>
                <p className={`text-xl font-bold flex items-center justify-center gap-1 ${
                  finalSavings > savingsAmount ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${finalSavings}
                  {finalSavings > savingsAmount ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </p>
              </div>
            </div>

            {/* Scenario Results */}
            <div className="space-y-3">
              <h3 className="font-semibold">Your Decisions</h3>
              {scenarioResults.map((result, index) => {
                const scenario = scenarios.find(s => s.id === result.id)
                const choice = scenario?.choices.find(c => c.id === result.choiceId)
                return (
                  <div key={result.id} className="p-3 rounded-lg bg-muted/30 text-sm">
                    <p className="font-medium">{scenario?.title}</p>
                    <p className="text-muted-foreground mt-1">{choice?.consequence}</p>
                    <p className={`mt-1 font-medium ${result.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Impact: {result.impact >= 0 ? '+' : ''}{result.impact}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Tips */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Key Takeaways
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Always try to save at least 10% of your income</li>
                <li>Emergency savings protect you from unexpected expenses</li>
                <li>Avoid credit card debt when possible - interest adds up fast</li>
                <li>Small daily decisions compound into big differences over time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" asChild className="flex-1">
            <Link href="/simulations">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Simulations
            </Link>
          </Button>
          <Button onClick={() => {
            setStep('intro')
            setBudget(initialBudget)
            setCurrentScenario(0)
            setScenarioResults([])
          }} className="flex-1">
            Try Again
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    )
  }

  return null
}
