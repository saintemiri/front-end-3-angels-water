import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import glassWater from "../assets/glasswater.png";

function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="6.5" r="3.25" />
      <path d="M3.5 17c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 5.5l7 5.5 7-5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M5.2 3h2l1 3.2-1.6 1.3a9 9 0 0 0 4.9 4.9l1.3-1.6 3.2 1v2c0 1-.8 1.8-1.8 1.7A13.4 13.4 0 0 1 3.5 4.8C3.4 3.8 4.2 3 5.2 3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="8" rx="1.8" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" strokeLinecap="round" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M10 17.5s5.5-4.9 5.5-9A5.5 5.5 0 0 0 4.5 8.5c0 4.1 5.5 9 5.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.5" r="1.8" />
    </svg>
  )
}

function EyeIcon({ off }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M2 10s2.8-5.2 8-5.2S18 10 18 10s-2.8 5.2-8 5.2S2 10 2 10Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.2" />
      {off && <path d="M3 17 17 3" strokeLinecap="round" />}
    </svg>
  )
}

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  address: '',
}

export default function Signup() {
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log('Signup form (dummy data only):', form)
  }

  return (
    <div className="signup-page">
      <div className="signup-page__brand">3 Angels Water Station</div>

      <div className="signup-card">
        <div className="signup-card__media">
          <img
  className="signup-card__image"
  src={glassWater}
  alt="Glass being filled with clean water"
          />
          <p className="signup-card__tagline">
            Purified water delivery, gallon cleaning, and water refill services.
          </p>
        </div>

        <div className="signup-card__form">
          <h1 className="signup-card__title">Create Your Account</h1>
          <p className="signup-card__subtitle">
            Sign up to manage your deliveries and track your orders seamlessly.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="fullName">Full Name</label>
              <div className="field__input">
                <UserIcon />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={handleChange('fullName')}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <div className="field__input">
                  <MailIcon />
                  <input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange('email')}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <div className="field__input">
                  <PhoneIcon />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter number"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="field__input">
                <LockIcon />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="field__toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>

            <div className="field">
              <label htmlFor="address">Delivery Address</label>
              <div className="field__input">
                <MapPinIcon />
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your delivery address"
                  value={form.address}
                  onChange={handleChange('address')}
                  autoComplete="street-address"
                />
              </div>
            </div>

            <button type="submit" className="signup-card__submit">
              Sign Up
            </button>
          </form>

          <p className="signup-card__footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
