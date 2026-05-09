import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-[#1B4332] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Garo Portal
            </Link>
            <span className="ml-4 text-sm bg-[#D4A017] text-[#1B4332] px-2 py-1 rounded">
              EN | GA | HI
            </span>
          </div>

          <div className="flex items-center space-x-8">
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
        </div>
      </div>
    </nav>
  )
}