export function UserIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="6.5" r="3.25" />
      <path d="M3.5 17c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5" strokeLinecap="round" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="8" rx="1.8" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" strokeLinecap="round" />
    </svg>
  )
}

export function EyeIcon({ off }) {
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

export function DropIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2.5c2.6 3.4 5.5 7.1 5.5 10.2a5.5 5.5 0 1 1-11 0c0-3.1 2.9-6.8 5.5-10.2Z" />
    </svg>
  )
}