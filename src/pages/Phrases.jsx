import React, { useState, useEffect } from 'react';

function Phrases() {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    fetch('/api/phrases')
      .then(res => res.json())
      .then(data => setPhrases(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Common Phrases</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Daily conversation phrases in Garo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phrases.map((phrase, index) => (
          <div key={index} className="card">
            <h3 className="text-lg font-semibold mb-2">{phrase.english}</h3>
            <p className="text-primary-600 font-medium mb-1">{phrase.garo}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{phrase.hindi}</p>
            {phrase.explanation && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{phrase.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phrases;