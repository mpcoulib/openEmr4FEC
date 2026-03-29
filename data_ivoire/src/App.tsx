import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Nav } from './components/layout/Nav'
import { Ticker } from './components/layout/Ticker'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0A0A0A] text-white min-h-screen">
        <Nav />
        <Ticker />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
