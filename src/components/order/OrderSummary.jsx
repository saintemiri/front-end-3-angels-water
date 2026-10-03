import './OrderSummary.css'

export default function OrderSummary({ lineItems, total, beforeTotal, afterTotal }) {
  return (
    <aside className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>
      <ul className="order-summary__list">
        {lineItems.map((item) => (
          <li
            key={item.label}
            className={
              'order-summary__row' +
              (item.tone ? ` order-summary__row--${item.tone}` : '')
            }
          >
            <span className="order-summary__row-label">
              <span className="order-summary__row-icon" aria-hidden="true">
                {typeof item.icon === 'string' ? (
                  item.icon === 'truck' ? (
                    <TruckIcon />
                  ) : (
                    <DropletIcon />
                  )
                ) : (
                  item.icon
                )}
              </span>
              {item.label}
            </span>
            <span>{item.amount}</span>
          </li>
        ))}
      </ul>

      {beforeTotal}

      <div className="order-summary__total">
        <span>Total</span>
        <span>{total}</span>
      </div>

      {afterTotal}
    </aside>
  )
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <path
        d="M12 3C12 3 5 11.2 5 15.5A7 7 0 0 0 19 15.5C19 11.2 12 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
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
      <circle cx="7.5" cy="17" r="1.4" fill="currentColor" />
      <circle cx="17" cy="17" r="1.4" fill="currentColor" />
    </svg>
  )
}
