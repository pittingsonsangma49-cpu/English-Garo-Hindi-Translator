import { useState } from 'react';
import grammarData from '../data/garo_dictionary.json';

const Grammar = () => {
  const [activeTab, setActiveTab] = useState('wordOrder');

  const tabs = [
    { id: 'wordOrder', label: 'Word Order' },
    { id: 'tenseSuffixes', label: 'Tense Suffixes' },
    { id: 'questions', label: 'Questions' },
    { id: 'commands', label: 'Commands & Requests' },
    { id: 'negation', label: 'Negation' },
    { id: 'classifiers', label: 'Classifiers' },
  ];

  const { tense_suffixes, word_order, question_words, commands_and_requests, negation, key_corrections } = grammarData?.grammar_rules || {};
  const { classifiers } = grammarData?.classifier_engine || {};

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1A1A2E] mb-2">Garo Grammar Guide</h1>
          <p className="text-[#555555]">Learn the fundamental grammar rules of the Garo language</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 bg-[#F0F5FA] p-4 rounded-lg border border-[#C7D5E8]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2E75B6] text-white'
                  : 'bg-white text-[#1F4E79] hover:bg-[#E8F0FF] border border-[#B0CFF0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg border border-[#C7D5E8] p-6">
          {/* Word Order Tab */}
          {activeTab === 'wordOrder' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Word Order (SOV)</h2>
              <p className="text-[#555555] mb-6">
                Garo follows a Subject-Object-Verb (SOV) word order, which is fundamental to the language structure.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {word_order && word_order.map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#EBF3FB] rounded-lg border border-[#B0CFF0]">
                    <p className="text-sm text-[#555555] mb-2">
                      <span className="font-semibold text-[#1A1A2E]">Example:</span> {item.note}
                    </p>
                    <p className="text-[#1A1A2E] font-medium mb-1">Garo: {item.garo}</p>
                    <p className="text-[#1A1A2E]">English: {item.english}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tense Suffixes Tab */}
          {activeTab === 'tenseSuffixes' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Tense Suffixes</h2>
              <p className="text-[#555555] mb-6">
                Garo verbs are conjugated using suffixes to indicate tense, aspect, and mood. These are the 17 primary tense markers.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#1F4E79] text-white">
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Tense</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Suffix</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tense_suffixes && tense_suffixes.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#EBF3FB]'}
                      >
                        <td className="px-4 py-3 border border-[#C7D5E8] font-medium text-[#1A1A2E]">
                          {item.tense}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] font-mono text-[#2E75B6]">
                          {item.suffix}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.example}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Question Words</h2>
              <p className="text-[#555555] mb-6">
                These are the essential question words used in Garo. They typically come at the end of the sentence due to the SOV structure.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#1F4E79] text-white">
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Garo</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {question_words && question_words.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#EBF3FB]'}
                      >
                        <td className="px-4 py-3 border border-[#C7D5E8] font-medium text-[#1A1A2E]">
                          {item.garo}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.english}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Commands Tab */}
          {activeTab === 'commands' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Commands & Requests</h2>
              <p className="text-[#555555] mb-6">
                Imperative forms in Garo are used to give commands and make requests. These differ based on formality and subject.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#1F4E79] text-white">
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Garo</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commands_and_requests && commands_and_requests.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#EBF3FB]'}
                      >
                        <td className="px-4 py-3 border border-[#C7D5E8] font-medium text-[#1A1A2E]">
                          {item.garo}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.english}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Negation Tab */}
          {activeTab === 'negation' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Negation</h2>
              <p className="text-[#555555] mb-6">
                Learn how to express negation in Garo using negative particles and verb forms.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#1F4E79] text-white">
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Garo</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">English</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negation && negation.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#EBF3FB]'}
                      >
                        <td className="px-4 py-3 border border-[#C7D5E8] font-medium text-[#1A1A2E]">
                          {item.garo}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.english}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Classifiers Tab */}
          {activeTab === 'classifiers' && (
            <div>
              <h2 className="text-2xl font-bold text-[#1F4E79] mb-4">Classifier System</h2>
              <p className="text-[#555555] mb-6">
                Garo uses classifiers in certain constructions to categorize nouns. These are essential for proper noun classification and counting.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#1F4E79] text-white">
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Classifier</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Used For</th>
                      <th className="px-4 py-3 font-semibold border border-[#B0CFF0]">Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classifiers && classifiers.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#EBF3FB]'}
                      >
                        <td className="px-4 py-3 border border-[#C7D5E8] font-medium text-[#2E75B6]">
                          {item.classifier}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.used_for}
                        </td>
                        <td className="px-4 py-3 border border-[#C7D5E8] text-[#1A1A2E]">
                          {item.categories && item.categories.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Key Corrections Section */}
        {key_corrections && key_corrections.length > 0 && (
          <div className="mt-8 bg-[#FEF3CD] border-2 border-[#FFC107] rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#856404] mb-3">📌 Important Corrections</h3>
            <ul className="space-y-2">
              {key_corrections.map((correction, idx) => (
                <li key={idx} className="text-[#856404] flex items-start gap-2">
                  <span className="font-bold mt-1">•</span>
                  <span>{correction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grammar;
