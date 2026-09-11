import './DeliveryTracker.css'

const ICONS = {
  placed: CheckIcon,
  processing: BoxIcon,
  out_for_delivery: TruckIcon,
  delivered: HomeIcon,
}

/**
 * Reusable horizontal status tracker for a delivery/order flow.
 * `steps` is an array of { key, label, time, state } where state is
 * one of 'done' | 'active' | 'upcoming'.
 */
export default function DeliveryTracker({ steps }) {
  return (
    <ol className="delivery-tracker">
      {steps.map((step, index) => {
        const Icon = ICONS[step.key] ?? CheckIcon
        return (
          <li
            key={step.key}
            className={`delivery-tracker__step delivery-tracker__step--${step.state}`}
          >
            {index > 0 && <span className="delivery-tracker__connector" />}
            <span className="delivery-tracker__icon">
              <Icon />
            </span>
            <span className="delivery-tracker__label">{step.label}</span>
            <span className="delivery-tracker__time">{step.time}</span>
          </li>
        )
      })}
    </ol>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M4 8l8-4 8 4-8 4-8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 8v8l8 4 8-4V8M12 12v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M3 7h11v8H3z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 10h4l3 3v2h-7z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="17" r="1.6" fill="currentColor" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
