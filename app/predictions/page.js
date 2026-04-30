"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function PredictionsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [games, setGames] = useState([])
  const [loadingGames, setLoadingGames] = useState(true)
  const [selectedGame, setSelectedGame] = useState(null)
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

  const teamNames = {
    ATL: "Atlanta Hawks", BOS: "Boston Celtics", BKN: "Brooklyn Nets",
    CHA: "Charlotte Hornets", CHI: "Chicago Bulls", CLE: "Cleveland Cavaliers",
    DAL: "Dallas Mavericks", DEN: "Denver Nuggets", DET: "Detroit Pistons",
    GSW: "Golden State Warriors", HOU: "Houston Rockets", IND: "Indiana Pacers",
    LAC: "LA Clippers", LAL: "Los Angeles Lakers", MEM: "Memphis Grizzlies",
    MIA: "Miami Heat", MIL: "Milwaukee Bucks", MIN: "Minnesota Timberwolves",
    NOP: "New Orleans Pelicans", NYK: "New York Knicks", OKC: "Oklahoma City Thunder",
    ORL: "Orlando Magic", PHI: "Philadelphia 76ers", PHX: "Phoenix Suns",
    POR: "Portland Trail Blazers", SAC: "Sacramento Kings", SAS: "San Antonio Spurs",
    TOR: "Toronto Raptors", UTA: "Utah Jazz", WAS: "Washington Wizards",
  }

  const teamIds = {
    ATL: 1610612737, BOS: 1610612738, BKN: 1610612751, CHA: 1610612766,
    CHI: 1610612741, CLE: 1610612739, DAL: 1610612742, DEN: 1610612743,
    DET: 1610612765, GSW: 1610612744, HOU: 1610612745, IND: 1610612754,
    LAC: 1610612746, LAL: 1610612747, MEM: 1610612763, MIA: 1610612748,
    MIL: 1610612749, MIN: 1610612750, NOP: 1610612740, NYK: 1610612752,
    OKC: 1610612760, ORL: 1610612753, PHI: 1610612755, PHX: 1610612756,
    POR: 1610612757, SAC: 1610612758, SAS: 1610612759, TOR: 1610612761,
    UTA: 1610612762, WAS: 1610612764,
  }

  useEffect(() => {
    fetch("https://nba-api-r19o.onrender.com/today-games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games || [])
        setLoadingGames(false)
      })
      .catch(() => setLoadingGames(false))
  }, [])

  const handleGameClick = async (game) => {
    setSelectedGame(game)
    setPrediction(null)
    setError(null)
    setLoading(true)

    try {
      const response = await fetch("https://nba-api-r19o.onrender.com/predict-matchup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_team: game.home_team, away_team: game.away_team }),
      })
      const data = await response.json()
      setPrediction(data)
    } catch {
      setError("Unable to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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
                <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${link.href === "/predictions" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`}>{link.label}</Link>
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
                  <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors py-2 ${link.href === "/predictions" ? "text-orange-500" : "text-zinc-400 hover:text-white"}`} onClick={() => setIsOpen(false)}>{link.label}</Link>
                ))}
                <Link href="/predictions" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors w-full text-center block">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="py-12 md:py-16 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Today's Games</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Click on any game to get an AI-powered win probability prediction using each team's real season stats.</p>
        </div>
      </section>

      {/* Today's Games */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {loadingGames ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-zinc-500">Loading today's games...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 text-lg">No games scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-4 mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Select a Game to Predict</h2>
              {games.map((game) => (
                <button
                  key={game.game_id}
                  onClick={() => handleGameClick(game)}
                  className={`w-full bg-zinc-900/50 border rounded-xl p-6 hover:border-orange-500/50 hover:bg-zinc-900 transition-all text-left ${selectedGame?.game_id === game.game_id ? "border-orange-500 bg-zinc-900" : "border-zinc-800"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center mb-2">
                          <img
                            src={`https://cdn.nba.com/logos/nba/${teamIds[game.away_team]}/global/L/logo.svg`}
                            alt={game.away_team}
                            className="w-10 h-10 object-contain"
                            onError={(e) => { e.target.style.display='none' }}
                          />
                        </div>
                        <p className="text-white font-bold">{game.away_team}</p>
                        <p className="text-zinc-500 text-xs">{teamNames[game.away_team]}</p>
                      </div>
                      <div className="text-center px-4">
                        <span className="text-2xl font-bold text-orange-500">@</span>
                      </div>
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center mb-2">
                          <img
                            src={`https://cdn.nba.com/logos/nba/${teamIds[game.home_team]}/global/L/logo.svg`}
                            alt={game.home_team}
                            className="w-10 h-10 object-contain"
                            onError={(e) => { e.target.style.display='none' }}
                          />
                        </div>
                        <p className="text-white font-bold">{game.home_team}</p>
                        <p className="text-zinc-500 text-xs">{teamNames[game.home_team]}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 uppercase tracking-wide">{game.status}</span>
                      <p className="text-orange-500 text-sm font-medium mt-1">Click to predict →</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-zinc-500">Analyzing matchup...</p>
            </div>
          )}

          {/* Error */}
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center mb-8">{error}</div>}

          {/* Prediction Results */}
          {prediction && !prediction.error && selectedGame && (
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-white text-center mb-6">Prediction Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border-2 transition-all ${prediction.away_win_probability > prediction.home_win_probability ? "bg-orange-500/10 border-orange-500" : "bg-zinc-800/50 border-zinc-700"}`}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center mx-auto mb-4">
                      <img src={`https://cdn.nba.com/logos/nba/${teamIds[selectedGame.away_team]}/global/L/logo.svg`} alt={selectedGame.away_team} className="w-16 h-16 object-contain" onError={(e) => { e.target.style.display='none' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{teamNames[selectedGame.away_team]}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Away</p>
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{prediction.away_win_probability}%</div>
                    <p className="text-sm text-zinc-400">Win Probability</p>
                    {prediction.away_win_probability > prediction.home_win_probability && (
                      <div className="mt-4 inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Predicted Winner</div>
                    )}
                  </div>
                </div>
                <div className={`p-6 rounded-xl border-2 transition-all ${prediction.home_win_probability > prediction.away_win_probability ? "bg-orange-500/10 border-orange-500" : "bg-zinc-800/50 border-zinc-700"}`}>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center mx-auto mb-4">
                      <img src={`https://cdn.nba.com/logos/nba/${teamIds[selectedGame.home_team]}/global/L/logo.svg`} alt={selectedGame.home_team} className="w-16 h-16 object-contain" onError={(e) => { e.target.style.display='none' }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{teamNames[selectedGame.home_team]}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-4">Home</p>
                    <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">{prediction.home_win_probability}%</div>
                    <p className="text-sm text-zinc-400">Win Probability</p>
                    {prediction.home_win_probability > prediction.away_win_probability && (
                      <div className="mt-4 inline-flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Predicted Winner</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                  <span>{selectedGame.away_team}</span>
                  <span>{selectedGame.home_team}</span>
                </div>
                <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="bg-orange-500 transition-all duration-500" style={{ width: `${prediction.away_win_probability}%` }} />
                  <div className="bg-zinc-600 transition-all duration-500" style={{ width: `${prediction.home_win_probability}%` }} />
                </div>
              </div>
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