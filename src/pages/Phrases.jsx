import { useState, useEffect } from 'react'

export default function Phrases() {
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
    <div className="fade-page min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategory === ''
                ? 'bg-[#10B981] text-white'
                : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#10B981]'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#10B981]'
              }`}
            >
              {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Phrase Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhrases.map((phrase, index) => (
            <div
              key={index}
              onClick={() => practiceMode && toggleReveal(index)}
              className="card hover:border-[#10B981] transition cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇬🇧</span>
                  <p className="text-[#F1F5F9] font-medium">{phrase.english}</p>
                </div>
                
                {!practiceMode || revealedPhrases.has(index) ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏔️</span>
                      <p className="text-[#34D399] font-medium">{phrase.garo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇮🇳</span>
                      <p className="text-[#FCD34D]">{phrase.hindi}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-[#94A3B8]">Click to reveal</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setPracticeMode(!practiceMode)
                  setRevealedPhrases(new Set())
                }}
                className="primary-button w-full mt-4"
              >
                Practice
              </button>
            </div>
          ))}
        </div>

        {filteredPhrases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#94A3B8] text-lg">No phrases found</p>
          </div>
        )}
      </div>
    </div>
  )
}