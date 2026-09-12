import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Navigation from './components/Navigation'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Inventory from './pages/Inventory'


function AppContent() {

  const location = useLocation()

  const isInventoryPage = location.pathname === '/inventory'

  return (
    <>

      {!isInventoryPage && <Navigation />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/inventory" element={<Inventory />} />

      </Routes>

    </>
  )
}


function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  )
}


export default App
