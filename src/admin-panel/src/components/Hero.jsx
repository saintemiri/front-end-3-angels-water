
import { Link } from 'react-router-dom'
import FeatureCard from './FeatureCard.jsx'
import WaveDivider from './WaveDivider.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">Welcome, our Dearest Customer.</h1>
          <p className="hero__subtitle">
            Welcome to 3 Angels Water Station, where we provide the purest
            and cleanest drinking water. Order now!
          </p>
          <Link to="/order-now" className="btn btn-primary">
            Order Now
          </Link>

          <div className="hero__features">
            <FeatureCard>
              TRUSTED PURIFIED WATER
              <br />
              SERVICE PROVIDER
            </FeatureCard>
            <FeatureCard>
              <strong>5+</strong> YEARS INTO SERVICE
              <br />
              AND COUNTING!
            </FeatureCard>
          </div>
        </div>

      </div>

      <WaveDivider />
    </section>
  )
}


