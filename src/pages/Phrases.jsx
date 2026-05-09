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
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Common Phrases</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Daily conversation phrases in Garo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phrases.map((phrase, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{phrase.english}</h3>
            <p className="text-primary-600 font-medium mb-1">{phrase.garo}</p>
            <p className="text-slate-600 dark:text-slate-400 mb-2">{phrase.hindi}</p>
            {phrase.explanation && (
              <p className="text-sm text-slate-500 dark:text-slate-400">{phrase.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Phrases;