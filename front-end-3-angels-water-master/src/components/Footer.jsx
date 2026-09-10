import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__address">0921 street address</span>
        <nav className="footer__links" aria-label="Footer">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-service">Terms of Service</a>
          <a href="#contact-us">Contact Us</a>
        </nav>
      </div>
    </footer>
  )
}
