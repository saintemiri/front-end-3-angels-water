import { useState } from 'react'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim()) return

    setSubmitted(true)
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we’ll send you instructions
          to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Check your email</h2>
            <p>
              If an account exists with this email, password reset
              instructions will be sent there.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}