import { useState } from 'react'
import DeliveryTracker from '../components/order/DeliveryTracker.jsx'
import OrderSummary from '../components/order/OrderSummary.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import './TrackOrder.css'

const MOCK_ORDER = {
  id: 'ORD - 8921',
  status: 'Out For Delivery',
  expected: 'Expected today by 4:30pm',
  addressLines: ['123 BS Aquino ave,', 'Sto Nino,', 'Baliwag Bulacan'],
  lineItems: [
    { icon: 'droplet', label: '5 Gal round (x2)', amount: '100PHP' },
    { icon: 'truck', label: 'Delivery Fee', amount: '50PHP' },
  ],
  total: '150PHP',
  steps: [
    { key: 'placed', label: 'Order Placed', time: '09:00 AM', state: 'done' },
    { key: 'processing', label: 'Processing', time: '10:05 AM', state: 'done' },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      time: '01:30 PM',
      state: 'active',
    },
    { key: 'delivered', label: 'Delivered', time: 'Pending', state: 'upcoming' },
  ],
}

export default function TrackOrder() {
  const [orderIdInput, setOrderIdInput] = useState('')
  const [order, setOrder] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleTrack = (event) => {
    event.preventDefault()
    setSearched(true)

    setOrder(orderIdInput.trim() ? MOCK_ORDER : null)
  }

  const addressBlock = order && (
    <div className="order-summary__address">
      <h3 className="order-summary__address-title">Delivery Address</h3>
      {order.addressLines.map((line) => (
        <p key={line} className="order-summary__address-text">
          {line}
        </p>
      ))}
    </div>
  )

  const afterTotal = order && (
    <>
      <button type="button" className="order-summary__contact-btn">
        Contact Support
      </button>
      <p className="order-summary__note">
        <span className="order-summary__note-icon" aria-hidden="true">
          <InfoIcon />
        </span>
        empty bottles must be returned upon delivery to avoid 50php penalty
        fee per bottle.
      </p>
    </>
  )

  return (
    <section className="track-page">
      <div className="container track-page__inner">
        <h1 className="track-page__title">Track Your Delivery</h1>
        <p className="track-page__subtitle">
          Enter your tracking number below to see the current status of your
          3 Angels Water Order
        </p>

        <form className="track-page__search" onSubmit={handleTrack}>
          <span className="track-page__search-icon" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="track-page__search-input"
            placeholder="Enter Order ID"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary track-page__search-btn"
          >
            Track
          </button>
        </form>

        {searched && !order && (
          <p className="track-page__not-found">
            We couldn't find an order with that ID. Double check the number
            and try again.
          </p>
        )}

        {order && (
          <div className="track-page__layout">
            <div className="track-page__status-card">
              <div className="track-page__status-header">
                <div>
                  <span className="track-page__status-label">
                    Order Status
                  </span>
                  <h2 className="track-page__status-value">{order.status}</h2>
                  <p className="track-page__status-expected">
                    {order.expected}
                  </p>
                </div>
                <span className="track-page__order-id">
                  <TruckBadgeIcon />
                  {order.id}
                </span>
              </div>

              <DeliveryTracker steps={order.steps} />
            </div>

            <OrderSummary
              lineItems={order.lineItems}
              total={order.total}
              beforeTotal={addressBlock}
              afterTotal={afterTotal}
            />
          </div>
        )}
      </div>

      <WaveDivider />
    </section>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 20l-4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TruckBadgeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
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

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 8v.01M12 11v5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
