import { useState, useEffect } from 'react'
import { translateToGaro, translateFromGaro } from '../api/gemini'

export default function Translation() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [direction, setDirection] = useState('en-to-garo')
  const [loading, setLoading] = useState(false)
  const [breakdown, setBreakdown] = useState(null)
  const [dictionary, setDictionary] = useState(null)

  useEffect(() => {
    // Load dictionary for Gemini context
    fetch('/garo_dictionary.json')
      .then(res => res.json())
      .then(data => setDictionary(data))
      .catch(err => console.error('Failed to load dictionary:', err))
  }, [])

  const handleTranslate = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setBreakdown(null)

    try {
      let result
      if (direction === 'en-to-garo') {
        result = await translateToGaro(inputText, dictionary)
        setOutputText(result)
      } else {
        result = await translateFromGaro(inputText, dictionary)
        setOutputText(result)
      }

      // For single words, also try dictionary lookup
      if (inputText.trim().split(' ').length === 1) {
        const dictResult = await fetch('/garo-translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word: inputText.trim() })
        }).then(res => res.json())

        if (dictResult.found) {
          setBreakdown({
            source: 'Dictionary lookup',
            category: dictResult.category,
            classifier: dictResult.classifier
          })
        } else {
          setBreakdown({ source: 'AI Translation (word not in dictionary)' })
        }
      } else {
        setBreakdown({ source: 'AI Translation' })
      }
    } catch (error) {
      setOutputText('Translation failed. Please try again.')
      setBreakdown({ source: 'Error', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const charCount = inputText.length
  const isOverLimit = charCount > 2000

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Garo Language Translator</h1>
          <p className="text-lg text-gray-600">Translate between English, Garo, and Hindi</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setDirection('en-to-garo')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  direction === 'en-to-garo'
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                English → Garo
              </button>
              <button
                onClick={() => setDirection('garo-to-en')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  direction === 'garo-to-en'
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Garo → English
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
                <span className={`ml-2 text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                  {charCount}/2000
                </span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={direction === 'en-to-garo' ? 'Enter English text...' : 'Enter Garo text...'}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translation
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  placeholder="Translation will appear here..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                />
                {outputText && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 bg-[#D4A017] text-[#1B4332] px-3 py-1 rounded text-sm font-medium hover:bg-[#B8950C] transition-colors"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || loading || isOverLimit}
              className="bg-[#1B4332] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#0F2A1F] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>

        {breakdown && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Translation Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Source</p>
                <p className="font-medium">{breakdown.source}</p>
              </div>
              {breakdown.category && (
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium">{breakdown.category}</p>
                </div>
              )}
              {breakdown.classifier && (
                <div>
                  <p className="text-sm text-gray-600">Classifier</p>
                  <p className="font-medium">{breakdown.classifier}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}