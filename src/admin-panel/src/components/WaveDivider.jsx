import './WaveDivider.css'

export default function WaveDivider() {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 40 C 200 90, 400 0, 600 35 S 1000 90, 1200 30 L1200 90 L0 90 Z"
        fill="#5a86e0"
      />
      <path
        d="M0 55 C 220 20, 420 85, 620 50 S 1000 10, 1200 55 L1200 90 L0 90 Z"
        fill="#3f6ad1"
        opacity="0.85"
      />
    </svg>
  )
}
