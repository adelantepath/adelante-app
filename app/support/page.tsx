import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Search
} from 'lucide-react'

const faqs = [
  {
    question: 'How do I earn XP?',
    answer: 'You earn XP by completing lessons, passing quizzes, finishing simulations, and maintaining daily streaks. Different activities award different amounts of XP.'
  },
  {
    question: 'What happens if I break my streak?',
    answer: 'If you miss a day of learning, your streak resets to zero. However, your total XP and progress are never lost!'
  },
  {
    question: 'How do I level up?',
    answer: 'Levels are based on your total XP earned. As you complete more content and earn more XP, you will automatically progress to higher levels.'
  },
  {
    question: 'Can I use Adelante on mobile?',
    answer: 'Yes! Adelante is fully responsive and works great on mobile devices. Simply visit the website from your mobile browser.'
  },
  {
    question: 'How do I contact my AI Coach?',
    answer: 'Navigate to the AI Coach section from the sidebar. You can ask any life skills related question and get personalized guidance.'
  },
]

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of using Adelante',
    icon: BookOpen,
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials',
    icon: ExternalLink,
  },
  {
    title: 'Community Forum',
    description: 'Connect with other learners',
    icon: MessageCircle,
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to your questions or get in touch</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-2 border-border focus:border-primary focus:outline-none text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card className="course-card text-center">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold mb-1">AI Coach</h3>
            <p className="text-sm text-muted-foreground mb-4">Get instant help from AI</p>
            <Button className="w-full" asChild>
              <Link href="/ai-coach">Chat Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="course-card text-center">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold mb-1">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">Get help from our team</p>
            <Button variant="outline" className="w-full">
              Contact Us
            </Button>
          </CardContent>
        </Card>

        <Card className="course-card text-center">
          <CardContent className="p-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-bold mb-1">Guides</h3>
            <p className="text-sm text-muted-foreground mb-4">Browse documentation</p>
            <Button variant="outline" className="w-full">
              View Guides
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card className="course-card max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="p-4 bg-muted/50 rounded-xl"
            >
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground text-sm">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Resources</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Card key={resource.title} className="course-card cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <resource.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{resource.title}</h3>
                    <p className="text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
