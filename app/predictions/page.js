"use client"

import Link from "next/link"
import { useState } from "react"

export default function PredictionsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    { abbr: "ATL", name: "Atlanta Hawks" },
    { abbr: "BOS", name: "Boston Celtics" },
    { abbr: "BKN", name: "Brooklyn Nets" },
    { abbr: "CHA", name: "Charlotte Hornets" },
    { abbr: "CHI", name: "Chicago Bulls" },
    { abbr: "CLE", name: "Cleveland Cavaliers" },
    { abbr: "DAL", name: "Dallas Mavericks" },
    { abbr: "DEN", name: "Denver Nuggets" },
    { abbr: "DET", name: "Detroit Pistons" },
    { abbr: "GSW", name: "Golden State Warriors" },
    { abbr: "HOU", name: "Houston Rockets" },
    { abbr: "IND", name: "Indiana Pacers" },
    { abbr: "LAC", name: "LA Clippers" },
    { abbr: "LAL", name: "Los Angeles Lakers" },
    { abbr: "MEM", name: "Memphis Grizzlies" },
    { abbr: "MIA", name: "Miami Heat" },
    { abbr: "MIL", name: "Milwaukee Bucks" },
    { abbr: "MIN", name: "Minnesota Timberwolves" },
    { abbr: "NOP", name: "New Orleans Pelicans" },
    { abbr: "NYK", name: "New York Knicks" },
    { abbr: "OKC", name: "Oklahoma City Thunder" },
    { abbr: "ORL", name: "Orlando Magic" },
    { abbr: "PHI", name: "Philadelphia 76ers" },
    { abbr: "PHX", name: "Phoenix Suns" },
    { abbr: "POR", name: "Portland Trail Blazers" },
    { abbr: "SAC", name: "Sacramento Kings" },
    { abbr: "SAS", name: "San Antonio Spurs" },
    { abbr: "TOR", name: "Toronto Raptors" },
    { abbr: "UTA", name: "Utah Jazz" },
    { abbr: "WAS", name: "Washington Wizards" },
  ]

  const features = [
    {
      title: "Historical Data Analysis",
      description: "Our model analyzes over 20 years of NBA game data, including head-to-head records, seasonal performance trends, and historical matchup outcomes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
    },
    {
      title: "Real-Time Stats",
      description: "Live player statistics, injury reports, and roster changes are factored into predictions, ensuring accuracy based on the most current information.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: "Machine Learning",
      description: "Advanced neural networks trained on millions of data points continuously improve prediction accuracy through deep learning algorithms.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4c0 1.1.5 2.1 1.2 2.8L4 14.2c-.6.6-1 1.4-1 2.3V20a2 2 0 0 0 2 2h3.5c.9 0 1.7-.4 2.3-1l5.4-5.2c.7.7 1.7 1.2 2.8 1.2a4 4 0 0 0 0-8" />
          <circle cx="12" cy="6" r="2" />
        </svg>
      ),
    },
  ]

  const handlePredict = async () => {
    if (!homeTeam || !awayTeam) return
    if (homeTeam === awayTeam) {
      setError("Please select two different teams")
      return
    }

    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      const response = await fetch("https://nba-api-r19o.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          home_team: homeTeam,
          away_team: awayTeam,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError("Unable to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getTeamName = (abbr) => {
    const team = teams.find((t) => t.abbr === abbr)
    return team ? team.name : abbr
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Score Ticker */}
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

      {/* Navigation */}
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

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    link.href === "/predictions" ? "text-orange-500" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors">
                Get Started
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </nav>

          {isOpen && (
            <div className="md:hidden py-4 border-t border-zinc-800">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors py-2 ${
                      link.href === "/predictions" ? "text-orange-500" : "text-zinc-400 hover:text-white"
                    }`}
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

      {/* Page Header */}
      <section className="py-12 md:py-16 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Win Probability Predictor</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Select two teams and let our AI-powered model predict the outcome with advanced machine learning algorithms.
          </p>
        </div>
      </section>

      {/* Prediction Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Team Selectors */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Home Team */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-3">Home Team</label>
                <select
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Home Team</option>
                  {teams.map((team) => (
                    <option key={team.abbr} value={team.abbr}>
                      {team.name} ({team.abbr})
                    </option>
                  ))}
                </select>
              </div>

              {/* Away Team */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-3">Away Team</label>
                <select
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Away Team</option>
                  {teams.map((team) => (
                    <option key={team.abbr} value={team.abbr}>
                      {team.name} ({team.abbr})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* VS Indicator */}
            {homeTeam && awayTeam && (
              <div className="flex items-center justify-center gap-4 mb-8 py-4 border-y border-zinc-800">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-2 border-2 border-zinc-700">
                    <span className="font-bold text-white text-lg">{homeTeam}</span>
                  </div>
                  <p className="text-sm text-zinc-500">Home</p>
                </div>
                <span className="text-2xl font-bold text-orange-500">VS</span>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-2 border-2 border-zinc-700">
                    <span className="font-bold text-white text-lg">{awayTeam}</span>
                  </div>
                  <p className="text-sm text-zinc-500">Away</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                {error}
              </div>
            )}

            {/* Predict Button */}
            <button
              onClick={handlePredict}
              disabled={!homeTeam || !awayTeam || loading}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                  Predict Winner
                </>
              )}
            </button>
          </div>

          {/* Prediction Results */}
          {prediction && (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold text-white text-center mb-6">Prediction Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Home Team Result */}
                <div className={`p-6 rounded-xl border-2 transition-all ${
                  prediction.home_win_probability > prediction.away_win_probability
                    ? "bg-orange-500/10 border-orange-500"
                    : "bg-zinc-800/50 border-zinc-700"
                }`}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border-2 border-zinc-600">
                      <span className="font-bold text-white text-xl">{homeTeam}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{getTeamName(homeTeam)}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Home</p>
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                      {(prediction.home_win_probability * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-zinc-400">Win Probability</p>
                    {prediction.home_win_probability > prediction.away_win_probability && (
                      <div className="mt-4 inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Predicted Winner
                      </div>
                    )}
                  </div>
                </div>

                {/* Away Team Result */}
                <div className={`p-6 rounded-xl border-2 transition-all ${
                  prediction.away_win_probability > prediction.home_win_probability
                    ? "bg-orange-500/10 border-orange-500"
                    : "bg-zinc-800/50 border-zinc-700"
                }`}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4 border-2 border-zinc-600">
                      <span className="font-bold text-white text-xl">{awayTeam}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{getTeamName(awayTeam)}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Away</p>
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                      {(prediction.away_win_probability * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm text-zinc-400">Win Probability</p>
                    {prediction.away_win_probability > prediction.home_win_probability && (
                      <div className="mt-4 inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Predicted Winner
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Probability Bar */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                  <span>{homeTeam}</span>
                  <span>{awayTeam}</span>
                </div>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-orange-500 transition-all duration-500"
                    style={{ width: `${prediction.home_win_probability * 100}%` }}
                  />
                  <div
                    className="bg-zinc-600 transition-all duration-500"
                    style={{ width: `${prediction.away_win_probability * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 border-t border-zinc-800 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Our AI Model Works</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Our prediction engine combines multiple data sources and advanced algorithms to deliver accurate game outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">94%</p>
              <p className="text-sm text-zinc-400">Prediction Accuracy</p>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">1.2M+</p>
              <p className="text-sm text-zinc-400">Games Analyzed</p>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">50ms</p>
              <p className="text-sm text-zinc-400">Response Time</p>
            </div>
            <div className="text-center p-6 bg-zinc-900/30 rounded-xl border border-zinc-800">
              <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">30</p>
              <p className="text-sm text-zinc-400">NBA Teams Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; 2025 HoopsIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
