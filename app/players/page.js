"use client"

import Link from "next/link"
import { useState } from "react"

export default function PlayersPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [teamFilter, setTeamFilter] = useState("")

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

  const teams = [
    "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW",
    "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK",
    "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"
  ]

  const players = [
    { name: "Jayson Tatum", team: "BOS", ppg: 26.9, rpg: 8.1, apg: 4.9, initials: "JT", playerId: 1628369 },
    { name: "Donovan Mitchell", team: "CLE", ppg: 26.6, rpg: 5.1, apg: 6.1, initials: "DM", playerId: 1628378 },
    { name: "Jalen Brunson", team: "NYK", ppg: 28.7, rpg: 3.6, apg: 6.7, initials: "JB", playerId: 1628386 },
    { name: "Giannis Antetokounmpo", team: "MIL", ppg: 30.4, rpg: 11.5, apg: 6.5, initials: "GA", playerId: 203507 },
    { name: "Paolo Banchero", team: "ORL", ppg: 22.6, rpg: 6.9, apg: 5.4, initials: "PB", playerId: 1631094 },
    { name: "Tyrese Haliburton", team: "IND", ppg: 20.1, rpg: 3.9, apg: 10.9, initials: "TH", playerId: 1630169 },
    { name: "Joel Embiid", team: "PHI", ppg: 34.7, rpg: 11.0, apg: 5.6, initials: "JE", playerId: 203954 },
    { name: "Jimmy Butler", team: "MIA", ppg: 20.8, rpg: 5.3, apg: 5.0, initials: "JB", playerId: 202710 },
    { name: "Coby White", team: "CHI", ppg: 19.1, rpg: 4.5, apg: 5.1, initials: "CW", playerId: 1629632 },
    { name: "Trae Young", team: "ATL", ppg: 25.7, rpg: 2.8, apg: 10.8, initials: "TY", playerId: 1629029 },
    { name: "Mikal Bridges", team: "BKN", ppg: 19.6, rpg: 4.5, apg: 3.6, initials: "MB", playerId: 1628969 },
    { name: "Scottie Barnes", team: "TOR", ppg: 19.9, rpg: 8.2, apg: 6.1, initials: "SB", playerId: 1630567 },
    { name: "LaMelo Ball", team: "CHA", ppg: 23.9, rpg: 5.1, apg: 8.0, initials: "LB", playerId: 1630163 },
    { name: "Kyle Kuzma", team: "WAS", ppg: 22.2, rpg: 6.6, apg: 4.2, initials: "KK", playerId: 1628398 },
    { name: "Cade Cunningham", team: "DET", ppg: 22.7, rpg: 4.3, apg: 7.5, initials: "CC", playerId: 1630595 },
    { name: "Shai Gilgeous-Alexander", team: "OKC", ppg: 30.1, rpg: 5.5, apg: 6.2, initials: "SG", playerId: 1628983 },
    { name: "Nikola Jokic", team: "DEN", ppg: 26.4, rpg: 12.4, apg: 9.0, initials: "NJ", playerId: 203999 },
    { name: "Anthony Edwards", team: "MIN", ppg: 25.9, rpg: 5.4, apg: 5.1, initials: "AE", playerId: 1630162 },
    { name: "Kawhi Leonard", team: "LAC", ppg: 23.7, rpg: 6.1, apg: 3.6, initials: "KL", playerId: 202695 },
    { name: "Luka Doncic", team: "DAL", ppg: 33.9, rpg: 9.2, apg: 9.8, initials: "LD", playerId: 1629029 },
    { name: "Kevin Durant", team: "PHX", ppg: 27.1, rpg: 6.6, apg: 5.0, initials: "KD", playerId: 201142 },
    { name: "LeBron James", team: "LAL", ppg: 25.7, rpg: 7.3, apg: 8.3, initials: "LJ", playerId: 2544 },
    { name: "De'Aaron Fox", team: "SAC", ppg: 26.6, rpg: 4.6, apg: 5.6, initials: "DF", playerId: 1628368 },
    { name: "Zion Williamson", team: "NOP", ppg: 22.9, rpg: 5.8, apg: 5.0, initials: "ZW", playerId: 1629627 },
    { name: "Stephen Curry", team: "GSW", ppg: 26.4, rpg: 4.5, apg: 5.1, initials: "SC", playerId: 201939 },
    { name: "Jalen Green", team: "HOU", ppg: 19.6, rpg: 5.2, apg: 3.5, initials: "JG", playerId: 1630224 },
    { name: "Lauri Markkanen", team: "UTA", ppg: 23.2, rpg: 8.2, apg: 2.0, initials: "LM", playerId: 1628384 },
    { name: "Ja Morant", team: "MEM", ppg: 25.1, rpg: 5.6, apg: 8.1, initials: "JM", playerId: 1629630 },
    { name: "Victor Wembanyama", team: "SAS", ppg: 21.4, rpg: 10.6, apg: 3.9, initials: "VW", playerId: 1641705 },
    { name: "Anfernee Simons", team: "POR", ppg: 22.6, rpg: 2.8, apg: 5.5, initials: "AS", playerId: 1629014 },
  ]

  const filteredPlayers = teamFilter ? players.filter((p) => p.team === teamFilter) : players

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
                <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${link.href === "/players" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`}>{link.label}</Link>
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
                  <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors py-2 ${link.href === "/players" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`} onClick={() => setIsOpen(false)}>{link.label}</Link>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Star Players</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">Explore the top star players from all 30 NBA teams with real-time stats and AI-powered performance analytics.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-6 border-b border-zinc-800 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="text-sm font-medium text-zinc-400">Filter by Team:</label>
            <div className="flex flex-wrap gap-2 items-center">
              <button onClick={() => setTeamFilter("")} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${teamFilter === "" ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`}>All Teams</button>
              <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} className="bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select Team</option>
                {teams.map((team) => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
            {teamFilter && <span className="text-sm text-zinc-500">Showing {filteredPlayers.length} player{filteredPlayers.length !== 1 ? "s" : ""}</span>}
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <div key={player.name} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-orange-500/50 hover:bg-zinc-900 transition-all group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-800 overflow-hidden border-2 border-zinc-700 group-hover:border-orange-500/50 transition-colors">
                    <img
                      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`}
                      alt={player.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${player.initials}&background=27272a&color=fff&size=56` }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white leading-tight">{player.name}</h3>
                    <span className="text-sm text-orange-500 font-medium">{player.team}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{player.ppg}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">PPG</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{player.rpg}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">RPG</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">{player.apg}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">APG</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredPlayers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zinc-500 text-lg">No players found.</p>
              <button onClick={() => setTeamFilter("")} className="mt-4 text-orange-500 hover:text-orange-400 font-medium">Clear filter</button>
            </div>
          )}
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