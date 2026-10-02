import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__address">0921 street address</span>

        <nav className="footer__links" aria-label="Footer">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
    </footer>
  )
}