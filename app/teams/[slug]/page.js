import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default async function TeamPage({ params }) {
  const { slug } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  )

  // Get team info
  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .ilike('abbreviation', slug)
    .limit(1)

  const team = teams?.[0]

  // Get recent games for this team
  const { data: games } = await supabase
    .from('games')
    .select('*')
    .ilike('team_abbreviation', slug)
    .order('game_date', { ascending: false })
    .limit(10)

  if (!team) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Team not found</h2>
          <Link href="/teams" className="text-orange-500">Back to Teams</Link>
        </div>
      </main>
    )
  }

  const wins = games?.filter(g => g.wl === 'W').length || 0
  const losses = games?.filter(g => g.wl === 'L').length || 0
  const winRate = games?.length ? Math.round((wins / games.length) * 100) : 0

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">NBA Edge</Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="hover:text-white">Teams</Link>
          <Link href="/predictions" className="hover:text-white">Predictions</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Team header */}
        <div className="mb-10">
          <Link href="/teams" className="text-gray-500 text-sm hover:text-gray-300 mb-4 block">
            ← All Teams
          </Link>
          <h2 className="text-4xl font-bold">{team.full_name}</h2>
          <p className="text-gray-400 mt-1">{team.city} · Est. {team.year_founded}</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{wins}</div>
            <div className="text-gray-400 text-sm mt-1">Recent Wins</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white">{losses}</div>
            <div className="text-gray-400 text-sm mt-1">Recent Losses</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{winRate}%</div>
            <div className="text-gray-400 text-sm mt-1">Win Rate</div>
          </div>
        </div>

        {/* Recent games */}
        <h3 className="text-xl font-bold mb-4">Recent Games</h3>
        <div className="space-y-3">
          {games?.map((game) => (
            <div
              key={game.id}
              className="bg-gray-900 border border-gray-800 rounded-lg px-5 py-4 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{game.matchup}</div>
                <div className="text-gray-400 text-sm">{game.game_date}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-bold">{game.pts}</div>
                  <div className="text-gray-400 text-xs">PTS</div>
                </div>
                <div className={`text-lg font-bold px-3 py-1 rounded ${
                  game.wl === 'W'
                    ? 'bg-green-900 text-green-400'
                    : 'bg-red-900 text-red-400'
                }`}>
                  {game.wl}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}