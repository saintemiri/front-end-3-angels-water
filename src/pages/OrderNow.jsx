import { useEffect, useMemo, useRef, useState } from 'react'
import StepIndicator from '../components/order/StepIndicator.jsx'
import ContainerOption from '../components/order/ContainerOption.jsx'
import QuantityStepper from '../components/order/QuantityStepper.jsx'
import OrderSummary from '../components/order/OrderSummary.jsx'
import AddressStep, { SAVED_ADDRESSES } from '../components/order/AddressStep.jsx'
import ScheduleStep, {
  EXPRESS_SURCHARGE,
  TIME_SLOTS,
  getDeliveryDates,
} from '../components/order/ScheduleStep.jsx'
import PaymentStep, { PAYMENT_METHODS } from '../components/order/PaymentStep.jsx'
import OrderConfirmation from '../components/order/OrderConfirmation.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import { BoltIcon, TagIcon, AlertIcon } from '../components/order/icons.jsx'
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
const BOTTLE_PENALTY = 50

const PROMOS = {
  FIRST10: { kind: 'percent', value: 0.1 },
  FREEDEL: { kind: 'free-delivery' },
}

const STEP_LABELS = ['Selection', 'Address', 'Schedule', 'Payment']

const initialAddress = {
  mode: 'saved',
  savedId: SAVED_ADDRESSES[0].id,
  contactName: '',
  phone: '',
  street: '',
  barangay: '',
  city: '',
  landmark: '',
  saveForNextTime: true,
}

const initialSchedule = {
  speed: 'scheduled',
  date: '',
  slot: '',
  notes: '',
}

const initialPayment = {
  method: 'cod',
  changeFor: '',
  mobileNumber: '',
  promo: '',
  promoApplied: null,
  acceptedTerms: false,
}

const peso = (amount) => `${Math.round(amount)}PHP`

export default function OrderNow() {
  const [step, setStep] = useState(1)
  const [containerId, setContainerId] = useState('round')
  const [quantity, setQuantity] = useState(2)
  const [address, setAddress] = useState(initialAddress)
  const [schedule, setSchedule] = useState(initialSchedule)
  const [payment, setPayment] = useState(initialPayment)
  const [showErrors, setShowErrors] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [placedOrder, setPlacedOrder] = useState(null)

  const headingRef = useRef(null)
  const firstRender = useRef(true)

  const dates = useMemo(() => getDeliveryDates(), [])

  useEffect(() => {
    if (!schedule.date) {
      const openDay = dates.find((d) => !d.isSunday)
      if (openDay) setSchedule((s) => ({ ...s, date: openDay.id }))
    }
  }, [dates, schedule.date])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
    headingRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [step, placedOrder])

  const container = CONTAINERS.find((c) => c.id === containerId)
  const subtotal = container.price * quantity
  const expressFee = schedule.speed === 'express' ? EXPRESS_SURCHARGE : 0

  const promo = payment.promoApplied ? PROMOS[payment.promoApplied] : null
  const discount = promo?.kind === 'percent' ? subtotal * promo.value : 0
  const deliveryFee = promo?.kind === 'free-delivery' ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee + expressFee - discount

  const selectedSaved = SAVED_ADDRESSES.find((a) => a.id === address.savedId)

  const addressSummary =
    address.mode === 'saved'
      ? `${selectedSaved.label} — ${selectedSaved.lines.join(' ')}`
      : [address.street, address.barangay, address.city]
          .filter(Boolean)
          .join(', ') || 'New address'

  const scheduleSummary = useMemo(() => {
    if (schedule.speed === 'express') return 'Express — within 2 hours'
    const date = dates.find((d) => d.id === schedule.date)
    const slot = TIME_SLOTS.find((s) => s.id === schedule.slot)
    if (!date) return 'Not set yet'
    const dayLabel =
      date.dayName === 'Today' || date.dayName === 'Tomorrow'
        ? date.dayName
        : `${date.dayName}, ${date.month} ${date.dayNumber}`
    return slot ? `${dayLabel} · ${slot.label}` : `${dayLabel} · pick a window`
  }, [schedule, dates])

  const paymentLabel =
    PAYMENT_METHODS.find((m) => m.id === payment.method)?.title ?? ''

  const addressErrors = {}
  if (address.mode === 'new') {
    if (!address.contactName.trim())
      addressErrors.contactName = 'Tell us who to look for.'
    if (!/^[0-9+\s-]{7,}$/.test(address.phone.trim()))
      addressErrors.phone = 'Enter a number the rider can reach.'
    if (!address.street.trim())
      addressErrors.street = 'House number and street are required.'
    if (!address.barangay.trim()) addressErrors.barangay = 'Barangay is required.'
    if (!address.city.trim()) addressErrors.city = 'City is required.'
  }

  const scheduleErrors = {}
  if (schedule.speed === 'scheduled') {
    if (!schedule.date) scheduleErrors.date = 'Pick a delivery date.'
    if (!schedule.slot) scheduleErrors.slot = 'Pick a time window.'
  }

  const paymentErrors = {}
  if (
    (payment.method === 'gcash' || payment.method === 'maya') &&
    !/^[0-9+\s-]{7,}$/.test(payment.mobileNumber.trim())
  ) {
    paymentErrors.mobileNumber = 'Enter the number registered to the wallet.'
  }
  if (!payment.acceptedTerms) {
    paymentErrors.acceptedTerms = 'Please confirm the bottle return policy.'
  }

  const errorsByStep = { 2: addressErrors, 3: scheduleErrors, 4: paymentErrors }
  const currentErrors = errorsByStep[step] ?? {}
  const stepIsValid = Object.keys(currentErrors).length === 0
  const visibleErrors = showErrors ? currentErrors : {}

  const goTo = (next) => {
    setShowErrors(false)
    setStep(next)
  }

  const handleNext = () => {
    if (!stepIsValid) {
      setShowErrors(true)
      return
    }
    goTo(step + 1)
  }

  const handleApplyPromo = () => {
    const code = payment.promo.trim().toUpperCase()
    if (PROMOS[code]) {
      setPromoError('')
      setPayment((p) => ({ ...p, promo: code, promoApplied: code }))
    } else {
      setPromoError("That code isn't valid right now.")
      setPayment((p) => ({ ...p, promoApplied: null }))
    }
  }

  const handlePlaceOrder = () => {
    if (!stepIsValid) {
      setShowErrors(true)
      return
    }
    setPlacedOrder({
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      phone:
        address.mode === 'saved' ? selectedSaved.phone : address.phone.trim(),
      addressSummary,
      scheduleSummary,
      paymentLabel,
      total: peso(total),
    })
  }

  const handleOrderAgain = () => {
    setPlacedOrder(null)
    setStep(1)
    setQuantity(2)
    setPayment(initialPayment)
    setShowErrors(false)
    setPromoError('')
  }

  const lineItems = [
    {
      icon: 'droplet',
      label: `${container.shortLabel} (x${quantity})`,
      amount: peso(subtotal),
    },
    {
      icon: 'truck',
      label: 'Delivery Fee',
      amount: deliveryFee === 0 ? 'Free' : peso(deliveryFee),
      tone: deliveryFee === 0 ? 'positive' : undefined,
    },
  ]

  if (expressFee) {
    lineItems.push({
      icon: <BoltIcon size={14} />,
      label: 'Express delivery',
      amount: peso(expressFee),
    })
  }

  if (discount) {
    lineItems.push({
      icon: <TagIcon size={14} />,
      label: `Promo ${payment.promoApplied}`,
      amount: `−${peso(discount)}`,
      tone: 'positive',
    })
  }

  const summaryContext = step > 1 && (
    <div className="order-summary__address">
      <h3 className="order-summary__address-title">Delivery</h3>
      <p className="order-summary__address-text">{addressSummary}</p>
      {step > 2 && (
        <p className="order-summary__address-text">{scheduleSummary}</p>
      )}
    </div>
  )

  const note = (
    <p className="order-summary__note">
      <span className="order-summary__note-icon" aria-hidden="true">
        <AlertIcon />
      </span>
      Empty bottles must be returned upon delivery to avoid a {BOTTLE_PENALTY}{' '}
      PHP penalty fee per bottle.
    </p>
  )

  return (
    <section className="order-page">
      <div className="container order-page__inner">
        <h1
          className="order-page__title"
          tabIndex={-1}
          ref={headingRef}
        >
          {placedOrder ? 'Order placed' : 'Order Your Water'}
        </h1>
        <p className="order-page__subtitle">
          {placedOrder
            ? 'Keep your order number handy for tracking.'
            : 'Pure, refreshing water delivered directly at your door.'}
        </p>

        <StepIndicator currentStep={step} complete={Boolean(placedOrder)} />

        {placedOrder ? (
          <OrderConfirmation
            order={placedOrder}
            onOrderAgain={handleOrderAgain}
          />
        ) : (
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
                <AddressStep
                  value={address}
                  onChange={setAddress}
                  errors={visibleErrors}
                />
              )}

              {step === 3 && (
                <ScheduleStep
                  value={schedule}
                  onChange={setSchedule}
                  errors={visibleErrors}
                  dates={dates}
                />
              )}

              {step === 4 && (
                <PaymentStep
                  value={payment}
                  onChange={setPayment}
                  errors={{ ...visibleErrors, promo: promoError || undefined }}
                  addressSummary={addressSummary}
                  scheduleSummary={scheduleSummary}
                  onEditAddress={() => goTo(2)}
                  onEditSchedule={() => goTo(3)}
                  onApplyPromo={handleApplyPromo}
                />
              )}

              {showErrors && !stepIsValid && (
                <p className="order-page__form-error" role="alert">
                  <AlertIcon />
                  Check the highlighted fields before continuing.
                </p>
              )}

              <div className="order-page__actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="order-page__back"
                    onClick={() => goTo(step - 1)}
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    Next: {STEP_LABELS[step]}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePlaceOrder}
                  >
                    Place order · {peso(total)}
                  </button>
                )}
              </div>
            </div>

            <OrderSummary
              lineItems={lineItems}
              total={peso(total)}
              beforeTotal={summaryContext}
              afterTotal={note}
            />
          </div>
        )}
      </div>

      <WaveDivider />
    </section>
  )
}
