import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/translate', label: 'Translator' },
  { to: '/dictionary', label: 'Dictionary' },
  { to: '/grammar', label: 'Grammar Guide' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 text-[#1A1A2E]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1F4E79] text-xl font-bold text-white">G</div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#555555]">Garo Translator</p>
            <p className="text-lg font-semibold">English · Garo · Hindi</p>
          </div>
        </NavLink>

        <nav className="hidden flex-1 justify-evenly gap-4 px-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-6 py-2 text-sm font-semibold transition ${
                  isActive ? 'text-[#1A1A2E] underline decoration-[#2E75B6] underline-offset-8' : 'text-[#555555] hover:text-[#1A1A2E]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#1A1A2E] transition hover:border-[#2E75B6] hover:text-[#2E75B6] md:hidden"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-[#E8F0FF] text-[#1A1A2E]' : 'text-[#555555] hover:text-[#1A1A2E] hover:bg-slate-100'
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
