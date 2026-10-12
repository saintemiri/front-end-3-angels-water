import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'

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
          className="mx-auto mt-4 flex max-w-5xl items-center justify-between gap-4 rounded-lg border border-[#BDE8CE] bg-[#F0FBF4] px-4 py-3 text-sm text-[#237A43]"
        >
          <span>You have been logged out.</span>
          <button
            type="button"
            onClick={() => setShowLogoutMessage(false)}
            className="font-semibold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <Hero />
    </>
  )
}
