import './FeatureCard.css'

/**
 * Reusable card used to highlight a short trust/feature statement,
 * e.g. "Trusted purified water service provider".
 */
export default function FeatureCard({ children }) {
  return (
    <div className="feature-card">
      <p className="feature-card__text">{children}</p>
      <svg
        className="feature-card__check"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M7.5 12.5l3 3 6-6.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
