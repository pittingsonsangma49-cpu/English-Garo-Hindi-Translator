import React, { useState, useEffect } from 'react';

function Translator() {
  const [input, setInput] = useState('');
  const [translation, setTranslation] = useState('');
  const [breakdown, setBreakdown] = useState({});
  const [target, setTarget] = useState('garo');
  const [status, setStatus] = useState('Type a sentence for instant translation.');

  useEffect(() => {
    if (!input.trim()) {
      setTranslation('');
      setBreakdown({});
      setStatus('Type a sentence for instant translation.');
      return;
    }

    const timer = setTimeout(() => {
      setStatus('Translating...');
      fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, from: 'en', to: target })
      })
        .then((res) => res.json())
        .then((data) => {
          setTranslation(data.translatedText || 'Translation not found');
          setBreakdown(data.breakdown || {});
          setStatus(data.breakdown?.source || 'Translation complete');
        })
        .catch(() => {
          setTranslation('Unable to translate right now.');
          setStatus('Translation service error');
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [input, target]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sky-600 dark:text-sky-300 font-semibold uppercase tracking-[0.2em]">Live Semantic Translation</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">English ↔ Garo ↔ Hindi</h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">Type a phrase in English and receive a grammar-aware Garo translation. The engine uses the master Garo dictionary, classifier rules, and morphology-aware reconstruction.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-full sm:max-w-sm">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/80 p-4 border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Target language</p>
              <select value={target} onChange={(e) => setTarget(e.target.value)} className="input-field mt-2 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
                <option value="garo">Garo</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/80 p-4 border border-slate-200 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
              <p className="mt-2 text-slate-900 dark:text-white">{status}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Input Text</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enter English text to see Garo or Hindi translation.</p>
            </div>
          </div>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-4 w-full rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            placeholder="Type a sentence like 'I am eating rice'"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Translated Output</h3>
          <div className="mt-4 min-h-[240px] rounded-3xl bg-slate-50 dark:bg-slate-950 p-5 text-slate-900 dark:text-slate-100 shadow-inner shadow-black/20">
            <p className="whitespace-pre-wrap break-words text-lg leading-relaxed">{translation || 'Your translation will appear here.'}</p>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-500">Analysis</p>
            <div className="grid gap-3">
              {breakdown.grammar && <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 text-slate-700 dark:text-slate-200"><strong>Grammar:</strong> {breakdown.grammar}</div>}
              {breakdown.morphology && <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 text-slate-700 dark:text-slate-200"><strong>Morphology:</strong> {breakdown.morphology}</div>}
              {breakdown.tense && <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 text-slate-700 dark:text-slate-200"><strong>Tense:</strong> {breakdown.tense}</div>}
              {breakdown.classifier && <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/70 p-4 text-slate-700 dark:text-slate-200"><strong>Classifier:</strong> {breakdown.classifier}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translator;
