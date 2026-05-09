import React, { useState } from 'react';

function VerbsGrammar() {
  const [activeTab, setActiveTab] = useState('verbs');

  const tabs = [
    { id: 'verbs', label: 'Verbs' },
    { id: 'tense', label: 'Tense System' },
    { id: 'classifiers', label: 'Classifiers' },
    { id: 'structure', label: 'Sentence Structure' },
    { id: 'pronouns', label: 'Pronouns' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Verbs & Grammar</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Learn Garo grammar and morphology</p>
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === 'verbs' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Verb Roots & Conjugations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium">cha·a (eat)</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>Present: cha·enga</li>
                    <li>Past: cha·aha</li>
                    <li>Future: cha·gen</li>
                  </ul>
                </div>
                {/* Add more verb examples */}
              </div>
            </div>
          )}

          {activeTab === 'tense' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Tense System</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Present Continuous</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Suffix: -enga</p>
                  <p className="text-sm">Example: re·ang·a (going)</p>
                </div>
                {/* Add more tense examples */}
              </div>
            </div>
          )}

          {activeTab === 'classifiers' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Noun Classifiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium">Mang (Animals)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Used for animals, birds, fish, insects</p>
                  <p className="text-sm">Example: achak sa·mang (one dog)</p>
                </div>
                {/* Add more classifiers */}
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Sentence Structure</h3>
              <p className="mb-4">Garo follows Subject-Object-Verb (SOV) order</p>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-medium">Example:</p>
                <p className="text-sm">Anga mi cha·enga</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">I rice eating</p>
              </div>
            </div>
          )}

          {activeTab === 'pronouns' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Pronouns</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <p className="font-medium">I</p>
                  <p className="text-sm">Anga</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                  <p className="font-medium">You</p>
                  <p className="text-sm">Na·a</p>
                </div>
                {/* Add more pronouns */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerbsGrammar;