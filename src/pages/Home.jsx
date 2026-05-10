import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="fade-page min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-[#E8F0FF] px-4 py-2 text-sm font-semibold text-[#1F4E79]">English · Garo · Hindi Translator</div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[#1A1A2E] sm:text-6xl">Explore the Garo language of Northeast India — spoken by the A·chik people of Meghalaya and Assam.</h1>
              <p className="max-w-2xl text-lg text-[#555555]">A polished learning experience with a full dictionary, grammar guide, and dynamic translator for English, Garo, and Hindi.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/translate" className="primary-button">Start Translating</Link>
              <Link to="/dictionary" className="inline-flex items-center justify-center rounded-[8px] border border-[#2E75B6] px-6 py-3 text-sm font-semibold text-[#2E75B6] transition hover:bg-[#E8F0FF]">Browse Dictionary</Link>
            </div>
          </div>

          <div className="grid gap-5">
            {[
              {
                title: 'Three Languages',
                description: 'Translate and learn using English, Garo, and Hindi in one clean interface.',
              },
              {
                title: 'Full Dictionary',
                description: 'Search across 71 topics and 1000+ Garo words with instant client-side filtering.',
              },
              {
                title: 'Grammar Engine',
                description: 'Built-in SOV rules, tense suffixes, questions, negation, and classifier support.',
              },
            ].map((card) => (
              <div key={card.title} className="card">
                <p className="text-sm uppercase tracking-[0.3em] text-[#2E75B6]">{card.title}</p>
                <p className="mt-3 text-base leading-7 text-[#555555]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
