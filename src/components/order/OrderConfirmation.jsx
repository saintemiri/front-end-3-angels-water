import { Link } from 'react-router-dom'
import { CheckIcon, MapPinIcon, ClockIcon, WalletIcon } from './icons.jsx'
import './OrderConfirmation.css'

export default function OrderConfirmation({ order, onOrderAgain }) {
  return (
    <section className="order-confirmation">
      <span className="order-confirmation__mark" aria-hidden="true">
        <CheckIcon size={30} />
      </span>

      <h2 className="order-confirmation__title">Your water is on the books</h2>
      <p className="order-confirmation__lead">
        We sent a confirmation to {order.phone}. The rider will text you before
        heading out.
      </p>

      <p className="order-confirmation__ref">
        Order number
        <strong>{order.id}</strong>
      </p>

      <dl className="order-confirmation__details">
        <div className="order-confirmation__detail">
          <dt>
            <ClockIcon size={17} />
            Arriving
          </dt>
          <dd>{order.scheduleSummary}</dd>
        </div>
        <div className="order-confirmation__detail">
          <dt>
            <MapPinIcon size={17} />
            Delivering to
          </dt>
          <dd>{order.addressSummary}</dd>
        </div>
        <div className="order-confirmation__detail">
          <dt>
            <WalletIcon size={17} />
            Paying with
          </dt>
          <dd>
            {order.paymentLabel} · {order.total}
          </dd>
        </div>
      </dl>

      <div className="order-confirmation__actions">
        <Link to="/track-order" className="btn btn-primary">
          Track this order
        </Link>
        <button
          type="button"
          className="order-confirmation__secondary"
          onClick={onOrderAgain}
        >
          Place another order
        </button>
      </div>

      <p className="order-confirmation__footnote">
        Need to change something? Call the station at 0917 555 0134 before your
        window starts.
      </p>
    </section>
  )
}
