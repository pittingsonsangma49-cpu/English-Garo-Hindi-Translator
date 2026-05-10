import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Translation from './pages/Translation'
import Dictionary from './pages/Dictionary'
import Grammar from './pages/Grammar'
import About from './pages/About'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-[#1A1A2E]">
        <Navbar />
        <main className="pb-24 pt-28 md:pt-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translate" element={<Translation />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
