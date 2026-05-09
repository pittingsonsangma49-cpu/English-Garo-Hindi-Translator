import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Translator from './pages/Translator';
import Dictionary from './pages/Dictionary';
import Phrases from './pages/Phrases';
import VerbsGrammar from './pages/VerbsGrammar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.08),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.06),_transparent_20%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_24%)]">
          <nav className="relative z-20 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-200 font-bold">G</div>
                  <div>
                    <p className="text-sm text-sky-600 dark:text-sky-300">A'chik Garo</p>
                    <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Semantic Translator</h1>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  <Link to="/" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition">Translator</Link>
                  <Link to="/dictionary" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition">Dictionary</Link>
                  <Link to="/phrases" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition">Phrases</Link>
                  <Link to="/verbs-grammar" className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition">Verbs & Grammar</Link>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500"
                  >
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 md:hidden"
                    aria-label="Open menu"
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {menuOpen && (
              <div className="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 md:hidden">
                <div className="max-w-7xl mx-auto px-4 py-3 space-y-2 sm:px-6">
                  <Link to="/" className="block rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Translator</Link>
                  <Link to="/dictionary" className="block rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Dictionary</Link>
                  <Link to="/phrases" className="block rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Phrases</Link>
                  <Link to="/verbs-grammar" className="block rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Verbs & Grammar</Link>
                </div>
              </div>
            )}
          </nav>

          <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Translator />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/phrases" element={<Phrases />} />
              <Route path="/verbs-grammar" element={<VerbsGrammar />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
