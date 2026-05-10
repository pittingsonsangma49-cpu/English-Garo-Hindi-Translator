import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#334155] bg-[#0F172A] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981] text-xl font-bold text-[#0F172A]">G</div>
          <div>
            <p className="text-sm text-slate-400">Garo Language</p>
            <p className="text-xl font-semibold">Garo Portal</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            { to: '/', label: 'Translation' },
            { to: '/common-words', label: 'Common Words' },
            { to: '/phrases', label: 'Phrases' },
            { to: '/verbs', label: 'Verbs' },
            { to: '/grammar', label: 'Grammar' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-[#10B981] underline underline-offset-8' : 'text-slate-300 hover:text-[#10B981]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#334155] text-slate-300 transition hover:border-[#10B981] hover:text-[#10B981] md:hidden"
        >
          ☰
        </button>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-[#10B981] via-transparent to-[#F59E0B]" />

      {menuOpen && (
        <div className="border-t border-[#334155] bg-[#0F172A] px-4 py-4 md:hidden">
          <div className="space-y-2">
            {[
              { to: '/', label: 'Translation' },
              { to: '/common-words', label: 'Common Words' },
              { to: '/phrases', label: 'Phrases' },
              { to: '/verbs', label: 'Verbs' },
              { to: '/grammar', label: 'Grammar' },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-[#0F172A] text-[#10B981]' : 'text-slate-300 hover:text-[#10B981] hover:bg-[#1E293B]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
