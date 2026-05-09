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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Common Words</h1>
          <p className="text-lg text-gray-600">Explore the Garo dictionary by category</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              >
                <option value="">Select a category...</option>
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
                placeholder="Search words..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Count</label>
              <select
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
              >
                {Array.from({length: 10}, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategory && (
            <div className="text-center">
              <p className="text-gray-600">
                Showing {words.length} words in "{selectedCategory.replace(/_/g, ' ')}"
              </p>
            </div>
          )}
        </div>

        {selectedCategory && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {words.map((word, index) => (
              <div key={index}>
                <WordCard {...word} />
                {count > 1 && (
                  <div className="mt-2 p-3 bg-[#D4A017] bg-opacity-10 rounded-lg border border-[#D4A017] border-opacity-20">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{count}</span> = {getCountedPhrase(word) || 'N/A'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!selectedCategory && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Select a category to explore words</p>
          </div>
        )}
      </div>
    </div>
  )
}