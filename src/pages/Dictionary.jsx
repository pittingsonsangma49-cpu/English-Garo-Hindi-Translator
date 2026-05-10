import { useMemo, useState } from 'react'
import dictionaryJson from '../data/garo_dictionary.json'

function Dictionary() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const categories = useMemo(() => Object.keys(dictionaryJson.dictionary_data), [])

  const entries = useMemo(() => {
    const allEntries = []
    for (const [section, content] of Object.entries(dictionaryJson.dictionary_data)) {
      if (section.startsWith('_')) continue
      for (const [english, garo] of Object.entries(content)) {
        if (english === '_classifier') continue
        allEntries.push({
          english,
          garo,
          category: section.replace(/_/g, ' '),
        })
      }
    }
    return allEntries
  }, [])

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase()
    return entries.filter((entry) => {
      if (category && entry.category !== category.replace(/_/g, ' ')) return false
      if (!query) return true
      return (
        entry.english.toLowerCase().includes(query) ||
        entry.garo.toLowerCase().includes(query) ||
        entry.category.toLowerCase().includes(query)
      )
    })
  }, [category, entries, search])

  return (
    <div className="fade-page min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-[12px] border border-slate-200 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#1A1A2E]">Garo Dictionary</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#555555]">Search the full dictionary locally. Filter instantly by category and keyword without any API request.</p>
            </div>
            <div className="text-sm font-semibold text-[#2E75B6]">{filteredEntries.length} entries</div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 rounded-[12px] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.07)] md:grid-cols-[1.6fr_0.9fr]">
          <input
            type="text"
            placeholder="Search English or Garo words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All categories</option>
            {categories.map((section) => (
              <option key={section} value={section}>
                {section.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEntries.map((entry, index) => (
            <div key={`${entry.english}-${index}`} className="rounded-[12px] border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-[#1A1A2E]">{entry.english}</p>
                <span className="rounded-full bg-[#E8F0FF] px-3 py-1 text-xs font-semibold text-[#1F4E79]">{entry.category}</span>
              </div>
              <p className="mt-4 text-base text-[#1A1A2E]">{entry.garo}</p>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="mt-10 rounded-[12px] border border-slate-200 bg-white p-8 text-center text-[#555555] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            No dictionary matches found. Try a different search term or category.
          </div>
        )}
      </div>
    </div>
  )
}

export default Dictionary;
