import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OrderNow from './pages/OrderNow.jsx'
import TrackOrder from './pages/TrackOrder.jsx'
import StaffPortal from './pages/StaffPortal.jsx'

export default function App() {
  return (
    <div className="page">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
