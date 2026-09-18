import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { UserIcon, LockIcon, EyeIcon, DropIcon } from '../components/AuthIcons.jsx'

const initialForm = {
  identifier: '',
  password: '',
}

export default function Login() {
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    console.log('Login form (dummy data only):', form)
    navigate('/')
  }

  return (
    <div className="container auth-page">
      <p className="auth-page__kicker">3 Angels Water Station</p>

      <div className="auth-card">
        <div className="auth-card__logo">
          <DropIcon />
        </div>

        <h1 className="auth-card__title">3 Angels Water</h1>
        <p className="auth-card__subtitle">User Log In</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label htmlFor="identifier">Email or Username</label>
            <div className="auth-field__input">
              <UserIcon />
              <input
                id="identifier"
                type="text"
                placeholder="Enter your e-mail"
                value={form.identifier}
                onChange={handleChange('identifier')}
                autoComplete="username"
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="auth-field__row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="auth-field__forgot">
                Forgot Password?
              </Link>
            </div>
            <div className="auth-field__input">
              <LockIcon />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange('password')}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-field__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-card__submit">
            Log In
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}