import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OrderNow from './pages/OrderNow.jsx'
import TrackOrder from './pages/TrackOrder.jsx'
import StaffPortal from './pages/StaffPortal.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import SignUpPage from './pages/Signup.jsx'


export default function App() {
  const location = useLocation()
  const hideChrome = location.pathname.startsWith('/staff-portal')

  return (
    <div className="page">
      {!hideChrome && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order-now" element={<OrderNow />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/staff-portal" element={<StaffPortal />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>

      {!hideChrome && <Footer />}
    </div>
  )
}