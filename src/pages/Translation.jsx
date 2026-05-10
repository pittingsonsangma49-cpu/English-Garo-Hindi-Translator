import { useState } from 'react'
import { translateToGaro, translateFromGaro } from '../translationEngine'

export default function Translation() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('garo')
  const [loading, setLoading] = useState(false)
  const [breakdown, setBreakdown] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLanguageChange = (newSource) => {
    setSourceLanguage(newSource)
    setTargetLanguage(newSource === 'en' ? 'garo' : 'en')
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setErrorMessage('Please type text to translate.')
      return
    }

    setLoading(true)
    setErrorMessage('')
    setOutputText('')
    setBreakdown(null)

    try {
      let result = ''

      if (sourceLanguage === 'en' && targetLanguage === 'garo') {
        result = translateToGaro(inputText)
      } else if (sourceLanguage === 'garo' && targetLanguage === 'en') {
        result = translateFromGaro(inputText)
      } else {
        throw new Error('Unsupported language direction.')
      }

      if (!result) {
        throw new Error('No translation was produced.')
      }

      setOutputText(result)
      setBreakdown({
        source: 'Local Engine',
        direction:
          sourceLanguage === 'en' ? 'English → Garo' : 'Garo → English',
      })

      if (result.includes('[unknown]') || /\[[^\]]+: unknown\]/.test(result)) {
        setErrorMessage('Some words could not be translated. Try a simpler phrase.')
      }
    } catch (error) {
      setOutputText('')
      setErrorMessage(error.message || 'Translation failed. Please try again.')
      setBreakdown({ source: 'Error', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleTranslate()
  }

  const copyToClipboard = () => {
    if (!outputText) return
    navigator.clipboard.writeText(outputText)
  }

  return (
    <div className="fade-page min-h-screen bg-[#F8FAFC] py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#1A1A2E] mb-4">Translate to Garo</h1>
        <p className="text-xl text-[#555555] mb-6">Powered by local translation logic and grammar-aware phrase matching</p>
        <div className="flex justify-center gap-4">
          <span className="px-4 py-2 bg-[#F0F5FA] text-[#1A1A2E] rounded-full border border-[#B0CFF0]">English</span>
          <span className="px-4 py-2 bg-[#2E75B6] text-white rounded-full border border-[#2E75B6]">Garo</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="card">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-[#555555] mb-2">Source language</label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="input-field w-full"
                  disabled={loading}
                >
                  <option value="en">English</option>
                  <option value="garo">Garo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#555555] mb-2">Target language</label>
                <select value={targetLanguage} className="input-field w-full" disabled>
                  <option value="garo">Garo</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="input-field h-48 resize-none"
              disabled={loading}
            />

            {errorMessage && (
              <div className="mt-4 rounded-lg bg-[#FEE2E2] border border-[#FCA5A5] p-4 text-[#991B1B]">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="primary-button w-full mt-4"
            >
              {loading ? 'Translating...' : 'Translate'}
            </button>
          </form>

          <div className="card relative">
            <div className="absolute top-4 right-4">
              <button
                type="button"
                onClick={copyToClipboard}
                className="px-3 py-1 bg-[#2E75B6] text-white rounded text-sm hover:bg-[#1F4E79] transition"
              >
                Copy
              </button>
            </div>

            <div className="h-48 p-4">
              {loading ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-[#555555]">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#B0CFF0] border-t-[#2E75B6]" />
                  <p>Translating...</p>
                </div>
              ) : outputText ? (
                <div className="text-lg text-[#1A1A2E] whitespace-pre-wrap break-words leading-relaxed">
                  {outputText}
                </div>
              ) : (
                <p className="text-[#555555] italic">Translation will appear here...</p>
              )}
            </div>

            {breakdown && (
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-[#F0F5FA] text-[#555555] rounded text-xs border border-[#B0CFF0]">
                  Source: {breakdown.source}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
