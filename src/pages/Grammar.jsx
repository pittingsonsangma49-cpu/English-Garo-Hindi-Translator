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
    <div className="fade-page min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sections */}
        <div className="space-y-12">
          {/* Classifier System */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏷️</span>
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F9]">Classifier System</h2>
            </div>
            <p className="text-[#94A3B8] mb-8">Noun classifiers categorize objects and determine counting patterns.</p>
            
            <div className="card">
              <table className="w-full text-[#F1F5F9]">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left py-3 px-4 font-semibold">Classifier</th>
                    <th className="text-left py-3 px-4 font-semibold">Used For</th>
                    <th className="text-left py-3 px-4 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {getClassifierExamples().map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[#1E293B]' : ''}>
                      <td className="py-3 px-4 text-[#10B981] font-semibold">{item.classifier}</td>
                      <td className="py-3 px-4 text-[#94A3B8]">{item.description}</td>
                      <td className="py-3 px-4">
                        <div className="bg-[#0F172A] rounded p-2 font-mono text-sm text-[#34D399]">
                          {item.examples[0]?.garo || 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Verb Tenses */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">⏰</span>
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F9]">Verb Tenses</h2>
            </div>
            <p className="text-[#94A3B8] mb-8">Garo verbs conjugate by changing their endings.</p>
            
            <div className="card">
              <table className="w-full text-[#F1F5F9]">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left py-3 px-4 font-semibold">Tense</th>
                    <th className="text-left py-3 px-4 font-semibold">Ending</th>
                    <th className="text-left py-3 px-4 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#10B981]/10">
                    <td className="py-3 px-4 text-[#10B981] font-semibold">Present</td>
                    <td className="py-3 px-4 text-[#94A3B8]">-enga</td>
                    <td className="py-3 px-4">
                      <div className="bg-[#0F172A] rounded p-2 font-mono text-sm text-[#34D399]">cha·enga</div>
                    </td>
                  </tr>
                  <tr className="bg-[#F59E0B]/10">
                    <td className="py-3 px-4 text-[#F59E0B] font-semibold">Past</td>
                    <td className="py-3 px-4 text-[#94A3B8]">-aha</td>
                    <td className="py-3 px-4">
                      <div className="bg-[#0F172A] rounded p-2 font-mono text-sm text-[#34D399]">cha·aha</div>
                    </td>
                  </tr>
                  <tr className="bg-[#8B5CF6]/10">
                    <td className="py-3 px-4 text-[#8B5CF6] font-semibold">Future</td>
                    <td className="py-3 px-4 text-[#94A3B8]">-gen</td>
                    <td className="py-3 px-4">
                      <div className="bg-[#0F172A] rounded p-2 font-mono text-sm text-[#34D399]">cha·gen</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Sentence Structure */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F9]">Sentence Structure</h2>
            </div>
            <p className="text-[#94A3B8] mb-8">Garo uses Subject-Object-Verb (SOV) word order.</p>
            
            <div className="card">
              <div className="bg-[#0F172A] rounded p-4 font-mono text-[#34D399] text-center">
                Subject + Object + Verb
              </div>
              <div className="mt-4 text-center text-[#94A3B8]">
                Example: Anga mi cha·enga (I rice eat)
              </div>
            </div>
          </section>

          {/* Numbers */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🔢</span>
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F9]">Numbers</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {numbers.map((num, index) => (
                <div key={index} className="card text-center">
                  <div className="text-2xl font-bold text-[#10B981] mb-2">{num.garo}</div>
                  <div className="text-[#F1F5F9] font-semibold">{num.num}</div>
                  <div className="text-[#FCD34D] text-sm">{num.hindi}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}