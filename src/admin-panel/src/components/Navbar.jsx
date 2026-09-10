import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/order-now', label: 'Order Now' },
  { to: '/track-order', label: 'Track Order' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          3 Angels Water Station
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                'navbar__link' + (isActive ? ' navbar__link--active' : '')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/staff-portal" className="navbar__staff">
          Staff Portal
        </NavLink>
      </div>
    </header>
  )
}
