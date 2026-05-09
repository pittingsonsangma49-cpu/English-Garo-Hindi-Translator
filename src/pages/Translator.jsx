import React, { useState, useEffect } from 'react';

function Translator() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [breakdown, setBreakdown] = useState({});

  useEffect(() => {
    if (input.trim()) {
      // Call translation API
      fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, from: 'en', to: 'garo' })
      })
        .then(res => res.json())
        .then(data => {
          setTranslation(data.translatedText);
          setBreakdown(data.breakdown || {});
        })
        .catch(err => console.error(err));
    } else {
      setTranslation('');
      setBreakdown({});
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Real-Time Translator</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">English ↔ Garo ↔ Hindi semantic translation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Input</h2>
          <textarea
            className="input-field h-32 resize-none"
            placeholder="Type your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Translation</h2>
          <div className="h-32 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {translation || 'Translation will appear here...'}
          </div>
        </div>
      </div>

      {Object.keys(breakdown).length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Analysis</h2>
          <div className="space-y-2">
            {breakdown.grammar && <p><strong>Grammar:</strong> {breakdown.grammar}</p>}
            {breakdown.morphology && <p><strong>Morphology:</strong> {breakdown.morphology}</p>}
            {breakdown.tense && <p><strong>Tense:</strong> {breakdown.tense}</p>}
            {breakdown.classifier && <p><strong>Classifier:</strong> {breakdown.classifier}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Translator;