"use client"

import Link from "next/link"
import { useState } from "react"

export default function TeamsPage() {
  const [isOpen, setIsOpen] = useState(false)

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

  const easternTeams = [
    { rank: 1, name: "Celtics", abbr: "BOS", city: "Boston", wins: 58, losses: 14, teamId: 1610612738 },
    { rank: 2, name: "Cavaliers", abbr: "CLE", city: "Cleveland", wins: 55, losses: 17, teamId: 1610612739 },
    { rank: 3, name: "Knicks", abbr: "NYK", city: "New York", wins: 52, losses: 20, teamId: 1610612752 },
    { rank: 4, name: "Bucks", abbr: "MIL", city: "Milwaukee", wins: 49, losses: 23, teamId: 1610612749 },
    { rank: 5, name: "Magic", abbr: "ORL", city: "Orlando", wins: 47, losses: 25, teamId: 1610612753 },
    { rank: 6, name: "Pacers", abbr: "IND", city: "Indiana", wins: 44, losses: 28, teamId: 1610612754 },
    { rank: 7, name: "76ers", abbr: "PHI", city: "Philadelphia", wins: 42, losses: 30, teamId: 1610612755 },
    { rank: 8, name: "Heat", abbr: "MIA", city: "Miami", wins: 41, losses: 31, teamId: 1610612748 },
    { rank: 9, name: "Bulls", abbr: "CHI", city: "Chicago", wins: 38, losses: 34, teamId: 1610612741 },
    { rank: 10, name: "Hawks", abbr: "ATL", city: "Atlanta", wins: 36, losses: 36, teamId: 1610612737 },
    { rank: 11, name: "Nets", abbr: "BKN", city: "Brooklyn", wins: 32, losses: 40, teamId: 1610612751 },
    { rank: 12, name: "Raptors", abbr: "TOR", city: "Toronto", wins: 28, losses: 44, teamId: 1610612761 },
    { rank: 13, name: "Hornets", abbr: "CHA", city: "Charlotte", wins: 24, losses: 48, teamId: 1610612766 },
    { rank: 14, name: "Wizards", abbr: "WAS", city: "Washington", wins: 18, losses: 54, teamId: 1610612764 },
    { rank: 15, name: "Pistons", abbr: "DET", city: "Detroit", wins: 15, losses: 57, teamId: 1610612765 },
  ]

  const westernTeams = [
    { rank: 1, name: "Thunder", abbr: "OKC", city: "Oklahoma City", wins: 57, losses: 15, teamId: 1610612760 },
    { rank: 2, name: "Nuggets", abbr: "DEN", city: "Denver", wins: 54, losses: 18, teamId: 1610612743 },
    { rank: 3, name: "Timberwolves", abbr: "MIN", city: "Minnesota", wins: 52, losses: 20, teamId: 1610612750 },
    { rank: 4, name: "Clippers", abbr: "LAC", city: "Los Angeles", wins: 49, losses: 23, teamId: 1610612746 },
    { rank: 5, name: "Mavericks", abbr: "DAL", city: "Dallas", wins: 48, losses: 24, teamId: 1610612742 },
    { rank: 6, name: "Suns", abbr: "PHX", city: "Phoenix", wins: 46, losses: 26, teamId: 1610612756 },
    { rank: 7, name: "Lakers", abbr: "LAL", city: "Los Angeles", wins: 45, losses: 27, teamId: 1610612747 },
    { rank: 8, name: "Kings", abbr: "SAC", city: "Sacramento", wins: 43, losses: 29, teamId: 1610612758 },
    { rank: 9, name: "Pelicans", abbr: "NOP", city: "New Orleans", wins: 40, losses: 32, teamId: 1610612740 },
    { rank: 10, name: "Warriors", abbr: "GSW", city: "Golden State", wins: 38, losses: 34, teamId: 1610612744 },
    { rank: 11, name: "Rockets", abbr: "HOU", city: "Houston", wins: 35, losses: 37, teamId: 1610612745 },
    { rank: 12, name: "Jazz", abbr: "UTA", city: "Utah", wins: 31, losses: 41, teamId: 1610612762 },
    { rank: 13, name: "Grizzlies", abbr: "MEM", city: "Memphis", wins: 27, losses: 45, teamId: 1610612763 },
    { rank: 14, name: "Spurs", abbr: "SAS", city: "San Antonio", wins: 22, losses: 50, teamId: 1610612759 },
    { rank: 15, name: "Trail Blazers", abbr: "POR", city: "Portland", wins: 19, losses: 53, teamId: 1610612757 },
  ]

  const TeamCard = ({ team }) => (
    <Link
      href={`/teams/${team.abbr.toLowerCase()}`}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 hover:bg-zinc-900 transition-all group cursor-pointer block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors overflow-hidden">
          <img
            src={`https://cdn.nba.com/logos/nba/${team.teamId}/global/L/logo.svg`}
            alt={team.name}
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.style.display='none' }}
          />
        </div>
        <span className="text-2xl font-bold text-orange-500">#{team.rank}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{team.name}</h3>
      <p className="text-sm text-zinc-500 mb-3">{team.city}</p>
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
        <span className="text-sm text-zinc-400">Record</span>
        <span className="text-sm font-semibold text-white">{team.wins}-{team.losses}</span>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Score Ticker */}
      <div className="bg-zinc-900/50 border-b border-zinc-800 overflow-hidden">
        <div className="flex animate-scroll">
          {[...scores, ...scores].map((game, index) => (
            <div key={index} className="flex items-center gap-4 px-6 py-2 border-r border-zinc-800 whitespace-nowrap">
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{game.status}</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm ${game.awayScore > game.homeScore ? "text-white" : "text-zinc-500"}`}>{game.away}</span>
                <span className={`font-mono text-sm ${game.awayScore > game.homeScore ? "text-orange-500" : "text-zinc-500"}`}>{game.awayScore}</span>
              </div>
              <span className="text-zinc-600 text-xs">@</span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm ${game.homeScore > game.awayScore ? "text-white" : "text-zinc-500"}`}>{game.home}</span>
                <span className={`font-mono text-sm ${game.homeScore > game.awayScore ? "text-orange-500" : "text-zinc-500"}`}>{game.homeScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <span className="font-bold text-white text-sm">H</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Hoops<span className="text-orange-500">IQ</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${link.href === "/teams" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`}>
                  {link.label}
                </Link>
              ))}
              <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">Get Started</Link>
            </div>
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </nav>
          {isOpen && (
            <div className="md:hidden py-4 border-t border-zinc-800">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors py-2 ${link.href === "/teams" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`} onClick={() => setIsOpen(false)}>{link.label}</Link>
                ))}
                <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors w-full text-center block">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 md:py-16 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">NBA Teams</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">Explore all 30 NBA teams with current standings, records, and AI-powered analytics for the 2024-25 season.</p>
        </div>
      </section>

      {/* Eastern Conference */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-orange-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Eastern Conference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {easternTeams.map((team) => <TeamCard key={team.abbr} team={team} />)}
          </div>
        </div>
      </section>

      {/* Western Conference */}
      <section className="py-12 md:py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-orange-500 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Western Conference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {westernTeams.map((team) => <TeamCard key={team.abbr} team={team} />)}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">&copy; 2025 HoopsIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}