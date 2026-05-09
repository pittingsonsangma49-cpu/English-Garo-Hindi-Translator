import { useState, useEffect } from 'react'

export default function Phrases() {
  const [dictionary, setDictionary] = useState(null)
  const [phrases, setPhrases] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [practiceMode, setPracticeMode] = useState(false)
  const [revealedPhrases, setRevealedPhrases] = useState(new Set())

  useEffect(() => {
    // Load dictionary and extract phrases from _examples
    fetch('/garo_dictionary.json')
      .then(res => res.json())
      .then(data => {
        setDictionary(data)
        extractPhrases(data)
      })
      .catch(err => console.error('Failed to load dictionary:', err))
  }, [])

  const extractPhrases = (dict) => {
    const allPhrases = []

    for (const [category, content] of Object.entries(dict)) {
      if (category.startsWith('_') || !content._examples) continue

      content._examples.forEach(example => {
        allPhrases.push({
          ...example,
          category
        })
      })
    }

    setPhrases(allPhrases)
  }

  const getFilteredPhrases = () => {
    let filtered = phrases

    if (selectedCategory) {
      filtered = filtered.filter(phrase => phrase.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(phrase =>
        phrase.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.garo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phrase.hindi.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const toggleReveal = (index) => {
    const newRevealed = new Set(revealedPhrases)
    if (newRevealed.has(index)) {
      newRevealed.delete(index)
    } else {
      newRevealed.add(index)
    }
    setRevealedPhrases(newRevealed)
  }

  const categories = [...new Set(phrases.map(p => p.category))]
  const filteredPhrases = getFilteredPhrases()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Common Phrases</h1>
          <p className="text-lg text-gray-600">Learn everyday Garo expressions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              >
                <option value="">All categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search phrases..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setPracticeMode(!practiceMode)}
                className={`w-full p-3 rounded-lg font-medium transition-colors ${
                  practiceMode
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {practiceMode ? 'Exit Practice' : 'Practice Mode'}
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Showing {filteredPhrases.length} phrases
              {practiceMode && ' (click cards to reveal answers)'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhrases.map((phrase, index) => (
            <div
              key={index}
              onClick={() => practiceMode && toggleReveal(index)}
              className={`bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer ${
                practiceMode ? 'hover:bg-gray-50' : ''
              }`}
            >
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  🇬🇧 {phrase.english}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {phrase.category.replace(/_/g, ' ')}
                </p>
              </div>

              {!practiceMode || revealedPhrases.has(index) ? (
                <div>
                  <p className="text-[#1B4332] font-medium text-base mb-2">
                    {phrase.garo}
                  </p>
                  <p className="text-gray-600 text-sm">
                    🇮🇳 {phrase.hindi}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Click to reveal Garo translation</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No phrases found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}