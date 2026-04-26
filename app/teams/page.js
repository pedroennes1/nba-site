import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default async function TeamsPage() {
  let teams = []
  let error = null

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY
    )
    const result = await supabase.from('teams').select('*').order('full_name')
    teams = result.data || []
    error = result.error
  } catch (e) {
    error = e.message
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500">NBA Edge</Link>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="text-white">Teams</Link>
          <Link href="/players" className="hover:text-white">Players</Link>
          <Link href="/predictions" className="hover:text-white">Predictions</Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">All NBA Teams</h2>

        {error && (
          <div className="bg-red-900 text-red-200 p-4 rounded mb-6">
            Error: {JSON.stringify(error)}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/teams/${team.abbreviation.toLowerCase()}`}
              className="bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl p-5 transition-all"
            >
              <div className="text-lg font-semibold">{team.nickname}</div>
              <div className="text-gray-400 text-sm">{team.city}</div>
              <div className="text-orange-500 text-xs mt-2">{team.abbreviation}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}