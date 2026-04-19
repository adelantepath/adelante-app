import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Adelante Pathways - Learn real life before it hits you",
  description: "Adelante Pathways prepares first-generation students and families for life transitions with practical skills in money management, housing, taxes, investing, career planning, and more. Your bridge to real-world readiness.",
  keywords: ["life skills", "financial literacy", "first generation", "education", "budgeting", "taxes", "career planning"],
  authors: [{ name: "Adelante Pathways" }],
  openGraph: {
    title: "Adelante Pathways",
    description: "Learn real life before it hits you. Prepare for adulthood with essential life skills.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  )
}
