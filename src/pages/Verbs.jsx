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
    <div className="fade-page min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verb Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for a verb..."
            value={selectedVerb}
            onChange={(e) => setSelectedVerb(e.target.value)}
            className="input-field w-full md:w-96"
            list="verbs-list"
          />
          <datalist id="verbs-list">
            {verbs.map((verb, index) => (
              <option key={index} value={verb.english} />
            ))}
          </datalist>
        </div>

        {/* Conjugation Table */}
        {selectedVerb && conjugations && (
          <div className="card overflow-x-auto">
            <table className="w-full text-[#F1F5F9]">
              <thead>
                <tr className="border-b border-[#334155]">
                  <th className="text-left py-3 px-4 font-semibold">Tense</th>
                  <th className="text-left py-3 px-4 font-semibold">Garo Ending</th>
                  <th className="text-left py-3 px-4 font-semibold">Example</th>
                  <th className="text-left py-3 px-4 font-semibold">Hindi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#1E293B]">
                  <td className="py-3 px-4 text-[#10B981] font-medium">Present</td>
                  <td className="py-3 px-4 text-[#94A3B8]">-enga</td>
                  <td className="py-3 px-4 text-[#34D399] font-semibold">{conjugations.present}</td>
                  <td className="py-3 px-4 text-[#FCD34D]">{verbs.find(v => v.english === selectedVerb)?.hindi || ''}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-[#F59E0B] font-medium">Past</td>
                  <td className="py-3 px-4 text-[#94A3B8]">-aha</td>
                  <td className="py-3 px-4 text-[#34D399] font-semibold">{conjugations.past}</td>
                  <td className="py-3 px-4 text-[#FCD34D]">{verbs.find(v => v.english === selectedVerb)?.hindi || ''}ा</td>
                </tr>
                <tr className="bg-[#1E293B]">
                  <td className="py-3 px-4 text-[#8B5CF6] font-medium">Future</td>
                  <td className="py-3 px-4 text-[#94A3B8]">-gen</td>
                  <td className="py-3 px-4 text-[#34D399] font-semibold">{conjugations.future}</td>
                  <td className="py-3 px-4 text-[#FCD34D]">{verbs.find(v => v.english === selectedVerb)?.hindi || ''}ेगा</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {!selectedVerb && (
          <div className="text-center py-12">
            <p className="text-[#94A3B8] text-lg">Search for a verb to see conjugations</p>
          </div>
        )}
      </div>
    </div>
  )
}