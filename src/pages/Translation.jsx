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
        result = await translateToGaro(inputText)
        setOutputText(result)
      } else {
        result = await translateFromGaro(inputText)
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
            source: 'Dictionary',
            category: dictResult.category,
            classifier: dictResult.classifier
          })
        } else {
          setBreakdown({ source: 'AI' })
        }
      } else {
        setBreakdown({ source: 'AI' })
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
    <div className="fade-page min-h-screen py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#F1F5F9] mb-4">Translate to Garo</h1>
        <p className="text-xl text-[#94A3B8] mb-6">Powered by AI + 700+ word dictionary</p>
        <div className="flex justify-center gap-4">
          <span className="px-4 py-2 bg-[#1E293B] text-[#F1F5F9] rounded-full border border-[#334155]">English</span>
          <span className="px-4 py-2 bg-[#10B981] text-white rounded-full">Garo</span>
          <span className="px-4 py-2 bg-[#1E293B] text-[#FCD34D] rounded-full border border-[#334155]">Hindi</span>
        </div>
      </div>

      {/* Translation Panel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Card */}
          <div className="card">
            <div className="mb-4">
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="input-field mb-4"
              >
                <option value="en-to-garo">English</option>
                <option value="garo-to-en">Garo</option>
              </select>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="input-field h-48 resize-none"
              disabled={loading}
            />
            <button
              onClick={handleTranslate}
              disabled={!inputText.trim() || loading}
              className="primary-button w-full mt-4"
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </div>

          {/* Output Card */}
          <div className="card relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-[#10B981] text-white rounded text-sm hover:bg-[#059669] transition"
              >
                Copy
              </button>
            </div>
            <div className="h-48">
              {outputText ? (
                <div className="text-lg">
                  {direction === 'en-to-garo' ? (
                    <>
                      <p className="text-[#34D399] font-semibold">{outputText}</p>
                      {/* Add Hindi translation if available */}
                    </>
                  ) : (
                    <p className="text-[#F1F5F9]">{outputText}</p>
                  )}
                </div>
              ) : (
                <p className="text-[#94A3B8] italic">Translation will appear here...</p>
              )}
            </div>
            {breakdown && (
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-[#1E293B] text-[#94A3B8] rounded text-xs border border-[#334155]">
                  Source: {breakdown.source}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Word Breakdown */}
        {breakdown && breakdown.category && (
          <div className="card mt-8">
            <h3 className="text-xl font-semibold text-[#F1F5F9] mb-4">Word Breakdown</h3>
            <table className="w-full text-[#F1F5F9]">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left py-2">Property</th>
                  <th className="text-left py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-[#94A3B8]">Category</td>
                  <td className="py-2">{breakdown.category}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#94A3B8]">Classifier</td>
                  <td className="py-2">{breakdown.classifier}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}