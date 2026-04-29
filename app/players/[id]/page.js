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
        <h3 className="text-xl font-bold mb-4">2024-25 Season Stats</h3>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Points', value: player.pts?.toFixed(1) },
            { label: 'Rebounds', value: player.reb?.toFixed(1) },
            { label: 'Assists', value: player.ast?.toFixed(1) },
            { label: 'Steals', value: player.stl?.toFixed(1) },
            { label: 'Blocks', value: player.blk?.toFixed(1) },
            { label: 'FG%', value: `${(player.fg_pct * 100)?.toFixed(1)}%` },
            { label: '3P%', value: `${(player.fg3_pct * 1