import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Angels Water
        </NavLink>

        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/about"
          >
            About
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/services"
          >
            Services
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navigation