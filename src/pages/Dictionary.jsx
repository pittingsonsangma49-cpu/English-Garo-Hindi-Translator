import React, { useState, useEffect } from 'react';

function Dictionary() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (search.trim()) {
      fetch(`/api/dictionary?query=${encodeURIComponent(search)}&category=${category}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error(err));
    } else {
      setResults([]);
    }
  }, [search, category]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Dictionary</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Search the Garo vocabulary database</p>
      </div>

      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="Search English, Garo, or Hindi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="input-field sm:w-48"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="animal">Animal</option>
            <option value="food">Food</option>
            <option value="color">Color</option>
            {/* Add more categories */}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2">English</th>
                <th className="text-left py-2">Garo</th>
                <th className="text-left py-2">Hindi</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Classifier</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-600">
                  <td className="py-2">{item.english}</td>
                  <td className="py-2">{item.garo}</td>
                  <td className="py-2">{item.hindi}</td>
                  <td className="py-2">{item.category}</td>
                  <td className="py-2">{item.classifier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;