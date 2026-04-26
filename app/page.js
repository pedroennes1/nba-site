import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-orange-500">NBA Edge</h1>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/teams" className="hover:text-white">Teams</Link>
          <Link href="/players" className="hover:text-white">Players</Link>
          <Link href="/predictions" className="hover:text-white">Predictions</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-bold mb-6">
          NBA Analytics <span className="text-orange-500">Powered by ML</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10">
          Win probabilities, power rankings, and advanced stats for every team and player — updated daily.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/teams" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
            View Teams
          </Link>
          <Link href="/predictions" className="border border-gray-700 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-semibold">
            Win Predictions
          </Link>
        </div>
      </section>

      {/* Stats cards */}
      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-3 gap-6">
        {[
          { label: 'Games Analyzed', value: '13,617' },
          { label: 'Seasons of Data', value: '5' },
          { label: 'Model Accuracy', value: '81%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-500">{stat.value}</div>
            <div className="text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>
    </main>
  )
}