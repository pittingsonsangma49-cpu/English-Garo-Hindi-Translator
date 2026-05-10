import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Translation from './pages/Translation'
import CommonWords from './pages/CommonWords'
import Phrases from './pages/Phrases'
import Verbs from './pages/Verbs'
import Grammar from './pages/Grammar'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9]">
        <Navbar />
        <main className="pb-24 pt-28 md:pt-32">
          <Routes>
            <Route path="/" element={<Translation />} />
            <Route path="/common-words" element={<CommonWords />} />
            <Route path="/phrases" element={<Phrases />} />
            <Route path="/verbs" element={<Verbs />} />
            <Route path="/grammar" element={<Grammar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
