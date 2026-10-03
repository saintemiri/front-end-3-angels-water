import { useState } from 'react'
import './ContactSupport.css'

export default function ContactSupport() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="contact-support-page">
      <div className="contact-support-card">
        <h1>Contact Support</h1>

        <p>
          Need help? Send us a message and our support team will
          get back to you as soon as possible.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="What do you need help with?"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Describe your concern..."
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        ) : (
          <div className="support-success">
            <h2>Message Sent!</h2>
            <p>
              Thank you for contacting us. Our support team will
              review your message.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}