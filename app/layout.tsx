import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Adelante - Learn real life before it hits you",
  description: "Adelante helps you prepare for real life by teaching essential skills like money management, housing, transportation, taxes, and career planning.",
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
