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
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Verbs & Grammar</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Learn Garo grammar and morphology</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === 'verbs' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Verb Roots & Conjugations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-white">cha·a (eat)</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
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
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Tense System</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">Present Continuous</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Suffix: -enga</p>
                  <p className="text-sm text-slate-900 dark:text-white">Example: re·ang·a (going)</p>
                </div>
                {/* Add more tense examples */}
              </div>
            </div>
          )}

          {activeTab === 'classifiers' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Noun Classifiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="font-medium text-slate-900 dark:text-white">Mang (Animals)</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Used for animals, birds, fish, insects</p>
                  <p className="text-sm text-slate-900 dark:text-white">Example: achak sa·mang (one dog)</p>
                </div>
                {/* Add more classifiers */}
              </div>
            </div>
          )}

          {activeTab === 'structure' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Sentence Structure</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-400">Garo follows Subject-Object-Verb (SOV) order</p>
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <p className="font-medium text-slate-900 dark:text-white">Example:</p>
                <p className="text-sm text-slate-900 dark:text-white">Anga mi cha·enga</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">I rice eating</p>
              </div>
            </div>
          )}

          {activeTab === 'pronouns' && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Pronouns</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
                  <p className="font-medium text-slate-900 dark:text-white">I</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Anga</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg text-center">
                  <p className="font-medium text-slate-900 dark:text-white">You</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Na·a</p>
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