import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#334155] bg-[#0F172A] text-[#F1F5F9]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-semibold text-white">About</p>
            <p className="mt-3 max-w-sm text-sm text-slate-400">
              A full Garo Language Portal built for education, preservation, and sustainable cultural growth across Northeast India.
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-white">Pages</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-[#10B981] transition-colors">Translation</Link>
              </li>
              <li>
                <Link to="/common-words" className="hover:text-[#10B981] transition-colors">Common Words</Link>
              </li>
              <li>
                <Link to="/phrases" className="hover:text-[#10B981] transition-colors">Phrases</Link>
              </li>
              <li>
                <Link to="/verbs" className="hover:text-[#10B981] transition-colors">Verbs</Link>
              </li>
              <li>
                <Link to="/grammar" className="hover:text-[#10B981] transition-colors">Grammar</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xl font-semibold text-white">Info</p>
            <p className="mt-3 text-sm text-slate-400">Dictionary v3.0 — 700+ entries</p>
            <p className="mt-4 text-sm text-slate-500">Preserving Indigenous Languages of Northeast India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
