import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Translation from './pages/Translation'
import CommonWords from './pages/CommonWords'
import Phrases from './pages/Phrases'
import Verbs from './pages/Verbs'
import Grammar from './pages/Grammar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Translation />} />
          <Route path="/common-words" element={<CommonWords />} />
          <Route path="/phrases" element={<Phrases />} />
          <Route path="/verbs" element={<Verbs />} />
          <Route path="/grammar" element={<Grammar />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}