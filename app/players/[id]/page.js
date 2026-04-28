import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default async function PlayerPage({ params }) {
  const { id } = await params

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  )

  const { data: seasons } = await supabase
    .from('players')
    .select('*')
    .eq('player_id', id)
    .order('season', { ascending: false })

  const player = seasons?.[0]

  if (!player) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Player not found</h2>
          <Link href="/players" className="text-orange-500">Back to Players</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">NBA Edge</Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="hover:text-white">Teams</Link>
          <Link href="/players" className="hover:text-white">Players</Link>
          <Link href="/predictions" className="hover:text-white">Predictions</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/players" className="text-gray-500 text-sm hover:text-gray-300 mb-4 block">
          ← All Players
        </Link>

        <div className="mb-10">
          <h2 className="text-4xl font-bold">{player.player_name}</h2>
          <p className="text-gray-400 mt-1">{player.team_abbreviation} · Age {player.age}</p>
        </div>

        {/* Current season stats */}
        <h3 className="text-xl font-bold mb-4">2024-25 Season Stats</h3>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Points', value: player.pts?.toFixed(1) },
            { label: 'Rebounds', value: player.reb?.toFixed(1) },
            { label: 'Assists', value: player.ast?.toFixed(1) },
            { label: 'Steals', value: player.stl?.toFixed(1) },
            { label: 'Blocks', value: player.blk?.toFixed(1) },
            { label: 'FG%', value: `${(player.fg_pct * 100)?.toFixed(1)}%` },
            { label: '3P%', value: `${(player.fg3_pct * 100)?.toFixed(1)}%` },
            { label: '+/-', value: player.plus_minus?.toFixed(1) },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Season history */}
        <h3 className="text-xl font-bold mb-4">Season History</h3>
        <div className="space-y-3">
          {seasons?.map(s => (
            <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-lg px-5 py-4 flex items-center justify-between">
              <div className="font-semibold">{s.season}</div>
              <div className="flex gap-6 text-sm text-gray-400">
                <span><span className="text-white font-bold">{s.pts?.toFixed(1)}</span> PTS</span>
                <span><span className="text-white font-bold">{s.reb?.toFixed(1)}</span> REB</span>
                <span><span className="text-white font-bold">{s.ast?.toFixed(1)}</span> AST</span>
                <span><span className="text-white font-bold">{(s.fg_pct * 100)?.toFixed(1)}%</span> FG</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}