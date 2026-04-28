import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default async function PlayersPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
  )

  const { data: players } = await supabase
    .from('players')
    .select('*')
    .eq('season', '2024-25')
    .order('pts', { ascending: false })
    .limit(50)

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">NBA Edge</Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="hover:text-white">Teams</Link>
          <Link href="/players" className="text-white">Players</Link>
          <Link href="/predictions" className="hover:text-white">Predictions</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-2">Top NBA Players</h2>
        <p className="text-gray-400 mb-8">2024-25 season — sorted by points per game</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-left">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Player</th>
                <th className="pb-3 pr-4">Team</th>
                <th className="pb-3 pr-4">PTS</th>
                <th className="pb-3 pr-4">REB</th>
                <th className="pb-3 pr-4">AST</th>
                <th className="pb-3 pr-4">FG%</th>
                <th className="pb-3 pr-4">3P%</th>
                <th className="pb-3">+/-</th>
              </tr>
            </thead>
            <tbody>
              {players?.map((player, index) => (
                <tr
                  key={player.id}
                  className="border-b border-gray-900 hover:bg-gray-900 transition-colors"
                >
                  <td className="py-3 pr-4 text-gray-500">{index + 1}</td>
                  <td className="py-3 pr-4 font-semibold">
                    <Link
                      href={`/players/${player.player_id}`}
                      className="hover:text-orange-500"
                    >
                      {player.player_name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-gray-400">{player.team_abbreviation}</td>
                  <td className="py-3 pr-4 text-orange-500 font-bold">{player.pts?.toFixed(1)}</td>
                  <td className="py-3 pr-4">{player.reb?.toFixed(1)}</td>
                  <td className="py-3 pr-4">{player.ast?.toFixed(1)}</td>
                  <td className="py-3 pr-4">{(player.fg_pct * 100)?.toFixed(1)}%</td>
                  <td className="py-3 pr-4">{(player.fg3_pct * 100)?.toFixed(1)}%</td>
                  <td className={`py-3 font-semibold ${player.plus_minus > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {player.plus_minus > 0 ? '+' : ''}{player.plus_minus?.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}