
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function HomeIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1Z" />
    </svg>
  )
}

export function BuildingIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 20V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v14" />
      <path d="M14 10h5a1 1 0 0 1 1 1v9" />
      <path d="M7 9h4M7 13h4M17 14h1M3 20h18" />
    </svg>
  )
}

export function PlusIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MapPinIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function UserIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  )
}

export function PhoneIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M6.5 3h2.2l1.3 3.8-1.9 1.5a10.8 10.8 0 0 0 5.6 5.6l1.5-1.9L19 13.3v2.2a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  )
}

export function SignpostIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 3v3M12 14v7M6 6h11l2.5 4L17 14H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

export function CalendarIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
    </svg>
  )
}

export function BoltIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M13 3 5.5 13.5H11l-.5 7.5L18 10.5h-5.5Z" />
    </svg>
  )
}

export function ClockIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function CashIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 10v4M18 10v4" />
    </svg>
  )
}

export function WalletIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M3.5 8.5A2 2 0 0 1 5.5 6.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2Z" />
      <path d="M3.5 9.5V7a1.5 1.5 0 0 1 1.8-1.5L16 7" />
      <circle cx="16.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BankIcon({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 10h16M12 3.5 20 8H4ZM6.5 10v7M11 10v7M15.5 10v7M3.5 20.5h17" />
    </svg>
  )
}

export function TagIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M11.5 3.5H20v8.5l-8.8 8.8a1.5 1.5 0 0 1-2.1 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.1Z" />
      <circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function AlertIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </svg>
  )
}

export function DropletIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <path
        d="M12 3C12 3 5 11.2 5 15.5A7 7 0 0 0 19 15.5C19 11.2 12 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function PencilIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17Z" />
    </svg>
  )
}
