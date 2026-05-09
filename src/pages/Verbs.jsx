import { useState, useEffect } from 'react'

export default function Verbs() {
  const [verbs, setVerbs] = useState([])
  const [selectedVerb, setSelectedVerb] = useState('')

  useEffect(() => {
    // Load dictionary and extract verbs
    fetch('/garo_dictionary.json')
      .then(res => res.json())
      .then(data => {
        extractVerbs(data)
      })
      .catch(err => console.error('Failed to load dictionary:', err))
  }, [])

  const extractVerbs = (dict) => {
    const verbCategories = ['verbs_present', 'verbs_past', 'verbs_future']
    const allVerbs = []

    verbCategories.forEach(category => {
      if (dict[category]) {
        for (const [english, entry] of Object.entries(dict[category])) {
          if (english.startsWith('_')) continue

          const garo = typeof entry === 'object' ? entry.garo : entry
          const hindi = typeof entry === 'object' ? entry.hindi : ''

          allVerbs.push({
            english,
            garo,
            hindi,
            category
          })
        }
      }
    })

    setVerbs(allVerbs)
  }

  const getVerbConjugations = (verb) => {
    if (!verb) return null

    // Basic conjugation patterns (simplified)
    const root = verb.garo.replace(/-(enga|aha|gen)$/, '')

    return {
      present: `${root}-enga`,
      past: `${root}-aha`,
      future: `${root}-gen`,
      negative: `${root}-ong·ja`,
      question: `${root}-enga maia?`
    }
  }

  const conjugations = selectedVerb ? getVerbConjugations(verbs.find(v => v.english === selectedVerb)) : null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Garo Verbs</h1>
          <p className="text-lg text-gray-600">Learn verb conjugation and tenses</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Verb</label>
            <select
              value={selectedVerb}
              onChange={(e) => setSelectedVerb(e.target.value)}
              className="w-full md:w-96 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent"
            >
              <option value="">Choose a verb...</option>
              {verbs.map((verb, index) => (
                <option key={index} value={verb.english}>
                  {verb.english} ({verb.garo})
                </option>
              ))}
            </select>
          </div>

          {selectedVerb && conjugations && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tense
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Garo Ending
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Example
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      English
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hindi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Present
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -enga
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">
                      {conjugations.present}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      I {selectedVerb.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      मैं {verbs.find(v => v.english === selectedVerb)?.hindi || ''}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Past
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -aha
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">
                      {conjugations.past}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      I {selectedVerb.toLowerCase()}ed
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      मैं {verbs.find(v => v.english === selectedVerb)?.hindi || ''}ा
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Future
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      -gen
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">
                      {conjugations.future}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      I will {selectedVerb.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      मैं {verbs.find(v => v.english === selectedVerb)?.hindi || ''}ूँगा
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Negative
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ong·ja
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">
                      {conjugations.negative}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      I do not {selectedVerb.toLowerCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      मैं नहीं {verbs.find(v => v.english === selectedVerb)?.hindi || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Question
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      maia?
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">
                      {conjugations.question}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Do I {selectedVerb.toLowerCase()}?
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      क्या मैं {verbs.find(v => v.english === selectedVerb)?.hindi || ''}?
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {!selectedVerb && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Select a verb to see its conjugations</p>
          </div>
        )}
      </div>
    </div>
  )
}