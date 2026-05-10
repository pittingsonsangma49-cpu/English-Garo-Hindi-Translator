import { useState, useEffect } from 'react'
import WordCard from '../components/WordCard'
import garoClassifier from '../garo_classifier (1).js'

export default function CommonWords() {
  const [dictionary, setDictionary] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [count, setCount] = useState(1)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Load dictionary
    fetch('/garo_dictionary.json')
      .then(res => res.json())
      .then(data => {
        setDictionary(data)
        // Get categories
        fetch('/garo-categories')
          .then(res => res.json())
          .then(catData => setCategories(catData.categories))
          .catch(err => console.error('Failed to load categories:', err))
      })
      .catch(err => console.error('Failed to load dictionary:', err))
  }, [])

  const getWordsForCategory = () => {
    if (!dictionary || !selectedCategory) return []

    const categoryData = dictionary[selectedCategory]
    if (!categoryData) return []

    const words = []
    for (const [english, entry] of Object.entries(categoryData)) {
      if (english.startsWith('_')) continue

      const garo = typeof entry === 'object' ? entry.garo : entry
      const hindi = typeof entry === 'object' ? entry.hindi : ''

      // Filter by search term
      if (searchTerm && !english.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !garo.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !hindi.toLowerCase().includes(searchTerm.toLowerCase())) {
        continue
      }

      words.push({
        english,
        garo,
        hindi,
        classifier: categoryData._classifier || garoClassifier.getClassifier(selectedCategory),
        category: selectedCategory
      })
    }

    return words
  }

  const getCountedPhrase = (word) => {
    if (!word || count < 1 || count > 10) return null
    try {
      return garoClassifier.countNoun(word.garo, count, word.category)
    } catch (error) {
      return null
    }
  }

  const words = getWordsForCategory()

  return (
    <div className="fade-page min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">📚</span>
            </div>
            <h1 className="text-4xl font-bold text-[#F1F5F9]">Common Words</h1>
          </div>
        </div>

        {/* Category Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#1E293B] text-[#94A3B8] border border-[#334155] hover:border-[#10B981]'
              }`}
            >
              {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search words..."
              className="input-field pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]">
              🔍
            </div>
          </div>
        </div>

        {/* Word Cards Grid */}
        {selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {words.map((word, index) => (
              <WordCard key={index} {...word} />
            ))}
          </div>
        )}

        {!selectedCategory && (
          <div className="text-center py-12">
            <p className="text-[#94A3B8] text-lg">Select a category to explore words</p>
          </div>
        )}
      </div>
    </div>
  )
}