import React, { useState, useEffect } from 'react';

function Dictionary() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (search.trim() || category) {
      fetch(`/api/dictionary?query=${encodeURIComponent(search)}&category=${category}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  }, [search, category]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20 backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Master Garo Dictionary</h1>
            <p className="mt-2 max-w-2xl text-slate-400">Search English, Garo, or Hindi vocabulary from the uploaded master dictionary. Results are fuzzy, semantic, and category-aware.</p>
          </div>
          <div className="text-slate-400">{results.length > 0 ? `${results.length} entries found` : 'Search to see results'}</div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="text"
              className="input-field flex-1 bg-slate-950 text-slate-100"
              placeholder="Search English, Garo, or Hindi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="input-field w-full sm:w-48 bg-slate-950 text-slate-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="animal">Animal</option>
              <option value="food">Food</option>
              <option value="color">Color</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-lg shadow-slate-950/20">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3">English</th>
                  <th className="px-4 py-3">Garo</th>
                  <th className="px-4 py-3">Hindi</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Classifier</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-slate-500">No entries found yet. Adjust your search or select a category.</td>
                  </tr>
                ) : (
                  results.map((item, index) => (
                    <tr key={index} className="border-t border-slate-800 hover:bg-slate-900/70 transition-colors">
                      <td className="px-4 py-3">{item.english}</td>
                      <td className="px-4 py-3">{item.garo}</td>
                      <td className="px-4 py-3">{item.hindi || '—'}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3">{item.classifier || 'none'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
