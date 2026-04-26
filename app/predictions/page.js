'use client'
import { useState } from 'react'
import Link from 'next/link'

const teams = [
  'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets',
  'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets',
  'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers',
  'Los Angeles Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
  'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks',
  'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns',
  'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
  'Utah Jazz', 'Washington Wizards'
]

const teamAverages = {
  fg_pct: 0.47, fg3_pct: 0.36, ft_pct: 0.78,
  reb: 44, ast: 25, stl: 7.5, blk: 5, tov: 13, pf: 20
}

export default function PredictionsPage() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function predict() {
    if (!homeTeam || !awayTeam) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamAverages)
      })
      const data = await res.json()
      setResult({ home: data.win_probability, away: data.loss_probability })
    } catch (e) {
      setResult({ error: 'Could not connect to prediction API' })
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">NBA Edge</Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="hover:text-white">Teams</Link>
          <Link href="/predictions" className="text-white">Predictions</Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2">Win Probability Predictor</h2>
        <p className="text-gray-400 mb-10">Select two teams to get an ML-powered win prediction.</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Home Team</label>
            <select
              value={homeTeam}
              onChange={e => setHomeTeam(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Select team...</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Away Team</label>
            <select
              value={awayTeam}
              onChange={e => setAwayTeam(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
            >
              <option value="">Select team...</option>
              {teams.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={predict}
          disabled={!homeTeam || !awayTeam || loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold mb-8"
        >
          {loading ? 'Predicting...' : 'Predict Winner'}
        </button>

        {result && !result.error && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-orange-500 rounded-xl p-6 text-center">
              <div className="text-gray-400 text-sm mb-1">{homeTeam}</div>
              <div className="text-4xl font-bold text-orange-500">{result.home}%</div>
              <div className="text-gray-400 text-sm mt-1">Win probability</div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-gray-400 text-sm mb-1">{awayTeam}</div>
              <div className="text-4xl font-bold text-white">{result.away}%</div>
              <div className="text-gray-400 text-sm mt-1">Win probability</div>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="bg-red-900 text-red-200 p-4 rounded">{result.error}</div>
        )}
      </section>
    </main>
  )
}