import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import './Home.css'

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showLogoutMessage, setShowLogoutMessage] = useState(
    Boolean(location.state?.loggedOut),
  )

  useEffect(() => {
    if (location.state?.loggedOut) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

  return (
    <>
      {showLogoutMessage && (
        <div
          role="status"
          className="home-logout-toast"
        >
          <span>You have been logged out.</span>
          <button
            type="button"
            onClick={() => setShowLogoutMessage(false)}
            className="home-logout-toast__dismiss"
          >
            Dismiss
          </button>
        </div>
      )}
      <Hero />
    </>
  )
}
