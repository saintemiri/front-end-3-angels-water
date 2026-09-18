import { useState } from 'react'
import StepIndicator from '../components/order/StepIndicator.jsx'
import ContainerOption from '../components/order/ContainerOption.jsx'
import QuantityStepper from '../components/order/QuantityStepper.jsx'
import OrderSummary from '../components/order/OrderSummary.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import './OrderNow.css'

const CONTAINERS = [
  {
    id: 'round',
    label: '5 Gallon Round (Standard size)',
    shortLabel: '5 Gal round',
    sublabel: '50.0 PHP / refill',
    price: 50,
  },
  {
    id: 'slim',
    label: '5 Gallon slim',
    shortLabel: '5 Gal slim',
    sublabel: '55.0 PHP / refill',
    price: 55,
  },
]

const DELIVERY_FEE = 50

export default function OrderNow() {
  const [step, setStep] = useState(1)
  const [containerId, setContainerId] = useState('round')
  const [quantity, setQuantity] = useState(2)

  const container = CONTAINERS.find((c) => c.id === containerId)
  const subtotal = container.price * quantity
  const total = subtotal + DELIVERY_FEE

  const lineItems = [
    {
      icon: 'droplet',
      label: `${container.shortLabel} (x${quantity})`,
      amount: `${subtotal}PHP`,
    },
    { icon: 'truck', label: 'Delivery Fee', amount: `${DELIVERY_FEE}PHP` },
  ]

  const note = (
    <p className="order-summary__note">
      <span className="order-summary__note-icon" aria-hidden="true">
        <InfoIcon />
      </span>
      empty bottles must be returned upon delivery to avoid 50php penalty
      fee per bottle.
    </p>
  )

  return (
    <section className="order-page">
      <div className="container order-page__inner">
        <h1 className="order-page__title">Order Your Water</h1>
        <p className="order-page__subtitle">
          Pure, refreshing water delivered directly at your door.
        </p>

        <StepIndicator currentStep={step} />

        <div className="order-page__layout">
          <div className="order-page__main">
            {step === 1 && (
              <section className="order-page__card">
                <h2 className="order-page__section-title">
                  Select Container Size
                </h2>
                <div className="order-page__options">
                  {CONTAINERS.map((c) => (
                    <ContainerOption
                      key={c.id}
                      label={c.label}
                      sublabel={c.sublabel}
                      price={`${c.price.toFixed(1)} PHP / refill`}
                      selected={c.id === containerId}
                      onSelect={() => setContainerId(c.id)}
                    />
                  ))}
                </div>

                <div className="order-page__quantity">
                  <span className="order-page__quantity-label">Quantity</span>
                  <QuantityStepper value={quantity} onChange={setQuantity} />
                </div>
              </section>
            )}

            {step === 2 && (
              <PlaceholderStep title="Delivery Address">
                Address form will be built in a later milestone.
              </PlaceholderStep>
            )}

            {step === 3 && (
              <PlaceholderStep title="Delivery Schedule">
                Scheduling options will be built in a later milestone.
              </PlaceholderStep>
            )}

            {step === 4 && (
              <PlaceholderStep title="Payment">
                Payment options will be built in a later milestone.
              </PlaceholderStep>
            )}

            <div className="order-page__actions">
              {step > 1 && (
                <button
                  type="button"
                  className="order-page__back"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next: {['Delivery Address', 'Schedule', 'Payment'][step - 1]}
                </button>
              ) : (
                <button type="button" className="btn btn-primary">
                  Place Order
                </button>
              )}
            </div>
          </div>

          <OrderSummary
            lineItems={lineItems}
            total={`${total}PHP`}
            afterTotal={note}
          />
        </div>
      </div>

      <WaveDivider />
    </section>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v.01M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PlaceholderStep({ title, children }) {
  return (
    <section className="order-page__placeholder-step">
      <h2 className="order-page__section-title">{title}</h2>
      <p>{children}</p>
    </section>
  )
}
