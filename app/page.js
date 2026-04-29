"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

// ============================================
// DATA
// ============================================

const scores = [
  { home: "LAL", homeScore: 118, away: "BOS", awayScore: 112, status: "Final" },
  { home: "GSW", homeScore: 124, away: "PHX", awayScore: 119, status: "Final" },
  { home: "MIA", homeScore: 105, away: "NYK", awayScore: 108, status: "Final" },
  { home: "DEN", homeScore: 132, away: "MIN", awayScore: 126, status: "Final" },
  { home: "MIL", homeScore: 115, away: "PHI", awayScore: 110, status: "Final" },
  { home: "DAL", homeScore: 121, away: "LAC", awayScore: 117, status: "Final" },
  { home: "BKN", homeScore: 99, away: "CHI", awayScore: 104, status: "Final" },
  { home: "ATL", homeScore: 128, away: "CLE", awayScore: 125, status: "Final" },
]

const navLinks = [
  { href: "/teams", label: "Teams" },
  { href: "/players", label: "Players" },
  { href: "/predictions", label: "Predictions" },
]

const newsArticles = [
  {
    id: 1,
    image: "/images/news-1.jpg",
    headline: "Lakers Clinch Playoff Spot with Dominant Performance",
    description: "Los Angeles secures their position with a commanding 118-105 victory, showcasing improved defensive metrics and efficient scoring.",
    time: "2 hours ago",
    category: "Playoffs",
  },
  {
    id: 2,
    image: "/images/news-2.jpg",
    headline: "Rising Stars: Rookie Class Exceeding Expectations",
    description: "This year's rookie class is proving to be one of the most talented in recent history, with multiple players making immediate impacts.",
    time: "4 hours ago",
    category: "Analysis",
  },
  {
    id: 3,
    image: "/images/news-3.jpg",
    headline: "How AI is Transforming NBA Team Strategy",
    description: "Teams are increasingly relying on advanced analytics and machine learning to optimize lineups, rotations, and game-time decisions.",
    time: "6 hours ago",
    category: "Technology",
  },
]

// ============================================
// SVG ICONS
// ============================================

function MenuIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function TrendingUpIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function ZapIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}

function BarChart3Icon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

function ActivityIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function BrainIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  )
}

function ChevronRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function TwitterIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function GithubIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// ============================================
// SCORE TICKER
// ============================================

function ScoreTicker() {
  return (
    <div className="bg-zinc-900/50 border-b border-zinc-800 overflow-hidden">
      <div className="flex animate-scroll">
        {[...scores, ...scores].map((game, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-2 border-r border-zinc-800 whitespace-nowrap"
          >
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
              {game.status}
            </span>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-sm ${game.awayScore > game.homeScore ? "text-white" : "text-zinc-500"}`}>
                {game.away}
              </span>
              <span className={`font-mono text-sm ${game.awayScore > game.homeScore ? "text-orange-500" : "text-zinc-500"}`}>
                {game.awayScore}
              </span>
            </div>
            <span className="text-zinc-600 text-xs">@</span>
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-sm ${game.homeScore > game.awayScore ? "text-white" : "text-zinc-500"}`}>
                {game.home}
              </span>
              <span className={`font-mono text-sm ${game.homeScore > game.awayScore ? "text-orange-500" : "text-zinc-500"}`}>
                {game.homeScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// NAVIGATION
// ============================================

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <span className="font-bold text-white text-sm">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Hoops<span className="text-orange-500">IQ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors w-full text-center block">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-1.5 mb-8">
            <ZapIcon className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-zinc-400">Powered by Advanced AI Models</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Hoops</span>
            <span className="text-orange-500">IQ</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-zinc-400 mb-4 font-medium">
            AI-Powered NBA Analytics
          </p>

          {/* Description */}
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-10">
            Unlock the future of basketball analysis. Get real-time predictions, player
            performance insights, and data-driven strategies powered by cutting-edge artificial
            intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
              Start Analyzing
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <button className="border border-zinc-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-zinc-900 transition-colors">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUpIcon className="w-5 h-5 text-orange-500" />
                <span className="text-3xl md:text-4xl font-bold text-white">94%</span>
              </div>
              <p className="text-sm text-zinc-500">Prediction Accuracy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3Icon className="w-5 h-5 text-orange-500" />
                <span className="text-3xl md:text-4xl font-bold text-white">1.2M+</span>
              </div>
              <p className="text-sm text-zinc-500">Games Analyzed</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ZapIcon className="w-5 h-5 text-orange-500" />
                <span className="text-3xl md:text-4xl font-bold text-white">50ms</span>
              </div>
              <p className="text-sm text-zinc-500">Real-time Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// WIN PREDICTOR CARD
// ============================================

function WinPredictorCard() {
  const features = [
    "Real-time probability updates during games",
    "Pre-game predictions with 94% accuracy",
    "Player impact analysis and injury adjustments",
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
          {/* Orange accent gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-500/80 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
                <BrainIcon className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-500 font-medium">Featured Tool</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Win Probability Predictor
              </h2>

              <p className="text-zinc-400 text-lg mb-6">
                Our AI model analyzes real-time game data, historical matchups, player performance
                metrics, and situational factors to deliver accurate win probability predictions for
                any NBA game.
              </p>

              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-zinc-400">
                    <ChevronRightIcon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2">
                Try Predictor Now
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-zinc-500">Tonight&apos;s Matchup</span>
                  <div className="flex items-center gap-2">
                    <ActivityIcon className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-500">Live</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-xl font-bold text-white">LAL</span>
                    </div>
                    <span className="text-sm text-zinc-500">Lakers</span>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-white">VS</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-xl font-bold text-white">BOS</span>
                    </div>
                    <span className="text-sm text-zinc-500">Celtics</span>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Win Probability</span>
                    <span className="text-white font-medium">42% - 58%</span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden flex">
                    <div className="bg-orange-500/70 transition-all duration-500" style={{ width: "42%" }} />
                    <div className="bg-orange-500 transition-all duration-500" style={{ width: "58%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>LAL</span>
                    <span>BOS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// NEWS SECTION
// ============================================

function NewsSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Latest NBA News</h2>
            <p className="text-zinc-500">Stay updated with the latest insights and analysis</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            View All News
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-orange-500/50 transition-colors cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.headline}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors">
                  {article.headline}
                </h3>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <ClockIcon className="w-3.5 h-3.5" />
                  <span>{article.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <button className="border border-zinc-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-zinc-900 transition-colors flex items-center gap-2 mx-auto">
            View All News
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/30 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="font-bold text-white text-sm">H</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Hoops<span className="text-orange-500">IQ</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 mb-4">
              AI-powered NBA analytics for the modern basketball fan.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                <GithubIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {["Win Predictor", "Player Stats", "Team Analysis", "API Access"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-600 text-center">
            &copy; {new Date().getFullYear()} HoopsIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function HoopsIQHomepage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ScoreTicker />
      <Navigation />
      <main>
        <HeroSection />
        <WinPredictorCard />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
