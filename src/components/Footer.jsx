import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Garo Language Portal
          </p>
          <p className="text-gray-400 mb-4">
            Preserving Indigenous Languages of Northeast India
          </p>

          <div className="flex justify-center space-x-6 mb-4">
            <Link to="/" className="hover:text-[#D4A017] transition-colors">
              Translation
            </Link>
            <Link to="/common-words" className="hover:text-[#D4A017] transition-colors">
              Common Words
            </Link>
            <Link to="/phrases" className="hover:text-[#D4A017] transition-colors">
              Phrases
            </Link>
            <Link to="/verbs" className="hover:text-[#D4A017] transition-colors">
              Verbs
            </Link>
            <Link to="/grammar" className="hover:text-[#D4A017] transition-colors">
              Grammar
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Dictionary v3.0 — 700+ entries
          </p>
        </div>
      </div>
    </footer>
  )
}