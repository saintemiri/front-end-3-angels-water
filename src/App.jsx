import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
import Login from './pages/Login.jsx'
import StaffLogin from './pages/StaffLogin.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ContactSupport from './pages/ContactSupport.jsx'
import CustomerSettings from './pages/CustomerSettings.jsx'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    const isAdminPortal = location.pathname.startsWith('/staff-portal')
    let theme = 'light'

    try {
      if (isAdminPortal) {
        theme = window.localStorage.getItem('admin-theme-preference') || 'light'
      } else {
        const customerSettings = window.localStorage.getItem('customer-account-settings')
        theme = customerSettings
          ? JSON.parse(customerSettings).preferences?.theme || 'light'
          : 'light'
      }
    } catch (error) {
      console.error('Unable to load portal theme preference.', error)
    }

    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light'
  }, [location.pathname])

  const hideChrome =
    location.pathname.startsWith('/staff-portal') ||
    location.pathname.startsWith('/staff-login')

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
          <Route path="/login" element={<Login />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/account-settings" element={<CustomerSettings />} />
        </Routes>
      </main>

      {!hideChrome && <Footer />}
    </div>
  )
}