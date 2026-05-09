import { useState, useEffect } from 'react'

export default function Grammar() {
  const [dictionary, setDictionary] = useState(null)
  const [activeSection, setActiveSection] = useState('classifiers')

  useEffect(() => {
    // Load dictionary for examples
    fetch('/garo_dictionary.json')
      .then(res => res.json())
      .then(data => setDictionary(data))
      .catch(err => console.error('Failed to load dictionary:', err))
  }, [])

  const sections = [
    { id: 'classifiers', title: 'Classifier System' },
    { id: 'tenses', title: 'Verb Tenses' },
    { id: 'structure', title: 'Sentence Structure' },
    { id: 'negation', title: 'Negation' },
    { id: 'questions', title: 'Questions' },
    { id: 'numbers', title: 'Numbers & Counting' },
    { id: 'pronouns', title: 'Pronouns' }
  ]

  const getClassifierExamples = () => {
    if (!dictionary?.classifier_engine) return []

    const examples = []
    for (const [classifier, data] of Object.entries(dictionary.classifier_engine)) {
      examples.push({
        classifier,
        description: data.use_for.join(', '),
        examples: data.examples || []
      })
    }
    return examples
  }

  const getPronouns = () => {
    if (!dictionary?.pronouns) return []

    const pronouns = []
    for (const [english, entry] of Object.entries(dictionary.pronouns)) {
      if (english.startsWith('_')) continue
      pronouns.push({
        english,
        garo: typeof entry === 'object' ? entry.garo : entry,
        hindi: typeof entry === 'object' ? entry.hindi : ''
      })
    }
    return pronouns
  }

  const numbers = [
    { num: 1, garo: 'sa', hindi: 'एक' },
    { num: 2, garo: 'gni', hindi: 'दो' },
    { num: 3, garo: 'gittam', hindi: 'तीन' },
    { num: 4, garo: 'bri', hindi: 'चार' },
    { num: 5, garo: 'bonga', hindi: 'पाँच' },
    { num: 6, garo: 'dok', hindi: 'छह' },
    { num: 7, garo: 'sni', hindi: 'सात' },
    { num: 8, garo: 'chet', hindi: 'आठ' },
    { num: 9, garo: 'sku', hindi: 'नौ' },
    { num: 10, garo: 'chiking', hindi: 'दस' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Garo Grammar</h1>
          <p className="text-lg text-gray-600">Learn the fundamental rules of Garo language</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-[#1B4332] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeSection === 'classifiers' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Noun Classifiers</h3>
                <p className="text-gray-600 mb-6">
                  In Garo, nouns are counted using classifiers that match their category.
                  The order is: NOUN + CLASSIFIER-NUMBER
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {getClassifierExamples().map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-[#1B4332] mb-2">
                        {item.classifier}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Used for: {item.description}
                      </p>
                      {item.examples.map((ex, i) => (
                        <div key={i} className="mb-2">
                          <p className="text-sm text-gray-900">{ex.english}</p>
                          <p className="text-sm text-[#1B4332] font-medium">{ex.garo}</p>
                          <p className="text-sm text-gray-600">{ex.hindi}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'tenses' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Verb Tenses</h3>
                <p className="text-gray-600 mb-6">
                  Garo verbs change their endings to indicate tense.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tense
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ending
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Example
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          English
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Present</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-enga</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">cha·enga</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">I eat</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Past</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-aha</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">cha·aha</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">I ate</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Future</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-gen</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1B4332] font-medium">cha·gen</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">I will eat</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeSection === 'structure' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sentence Structure</h3>
                <p className="text-gray-600 mb-6">
                  Garo follows Subject-Object-Verb (SOV) word order, unlike English which is Subject-Verb-Object (SVO).
                </p>

                <div className="bg-[#D4A017] bg-opacity-10 rounded-lg p-6 border border-[#D4A017] border-opacity-20">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">SOV Structure</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">English (SVO)</p>
                      <p className="text-lg font-medium">I rice eat</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Garo (SOV)</p>
                      <p className="text-lg font-medium text-[#1B4332]">Anga mi cha·enga</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Hindi</p>
                      <p className="text-lg font-medium">मैं चावल खाता हूँ</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'negation' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Negation</h3>
                <p className="text-gray-600 mb-6">
                  To make a verb negative, add "ong·ja" after the verb.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Positive</h4>
                    <p className="text-[#1B4332] font-medium">Anga cha·enga</p>
                    <p className="text-gray-600">I eat</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Negative</h4>
                    <p className="text-[#1B4332] font-medium">Anga cha·ong·ja</p>
                    <p className="text-gray-600">I do not eat</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'questions' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions</h3>
                <p className="text-gray-600 mb-6">
                  Garo uses question words at the end of sentences.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-[#1B4332] mb-2">maia</p>
                    <p className="text-sm text-gray-600">What?</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-[#1B4332] mb-2">bano</p>
                    <p className="text-sm text-gray-600">Where?</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-[#1B4332] mb-2">sawa</p>
                    <p className="text-sm text-gray-600">Who?</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-lg font-semibold text-[#1B4332] mb-2">maini-gimin</p>
                    <p className="text-sm text-gray-600">How many?</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'numbers' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Numbers & Counting</h3>
                <p className="text-gray-600 mb-6">
                  Garo numbers 1-10 with their Hindi equivalents.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {numbers.map((num, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-[#1B4332] mb-1">{num.garo}</p>
                      <p className="text-sm text-gray-600">{num.num}</p>
                      <p className="text-sm text-gray-500">{num.hindi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'pronouns' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pronouns</h3>
                <p className="text-gray-600 mb-6">
                  Personal pronouns in Garo, English, and Hindi.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getPronouns().map((pronoun, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-lg font-semibold text-gray-900 mb-2">{pronoun.english}</p>
                      <p className="text-[#1B4332] font-medium mb-1">{pronoun.garo}</p>
                      <p className="text-gray-600 text-sm">{pronoun.hindi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}