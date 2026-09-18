import ChoiceCard from './ChoiceCard.jsx'
import FormField from './FormField.jsx'
import {
  CashIcon,
  WalletIcon,
  BankIcon,
  PhoneIcon,
  TagIcon,
  PencilIcon,
  MapPinIcon,
  ClockIcon,
} from './icons.jsx'
import './PaymentStep.css'

export const PAYMENT_METHODS = [
  {
    id: 'cod',
    title: 'Cash on delivery',
    description: 'Pay the rider when your water arrives',
    icon: 'cash',
  },
  {
    id: 'gcash',
    title: 'GCash',
    description: 'We send a payment request to your number',
    icon: 'wallet',
  },
  {
    id: 'maya',
    title: 'Maya',
    description: 'We send a payment request to your number',
    icon: 'wallet',
  },
  {
    id: 'bank',
    title: 'Bank transfer',
    description: 'Account details are sent after you place the order',
    icon: 'bank',
    badge: 'For bulk orders',
  },
]

const ICONS = {
  cash: <CashIcon />,
  wallet: <WalletIcon />,
  bank: <BankIcon />,
}

export default function PaymentStep({
  value,
  onChange,
  errors,
  addressSummary,
  scheduleSummary,
  onEditAddress,
  onEditSchedule,
  onApplyPromo,
}) {
  const update = (patch) => onChange({ ...value, ...patch })
  const isEWallet = value.method === 'gcash' || value.method === 'maya'

  return (
    <>
      <section className="order-page__card">
        <h2 className="order-page__section-title">How would you like to pay?</h2>
        <p className="order-step__lead">
          Nothing is charged until the rider is on the way.
        </p>

        <div className="payment-step__methods" role="radiogroup" aria-label="Payment method">
          {PAYMENT_METHODS.map((method) => (
            <ChoiceCard
              key={method.id}
              icon={ICONS[method.icon]}
              title={method.title}
              description={method.description}
              badge={method.badge}
              selected={value.method === method.id}
              onSelect={() => update({ method: method.id })}
            >
              {method.id === 'cod' && (
                <FormField
                  id="pay-change"
                  label="Do you need change?"
                  optional
                  inputMode="numeric"
                  placeholder="e.g. 500"
                  hint="Tell the rider what bill you're paying with so they bring change."
                  value={value.changeFor}
                  onChange={(e) => update({ changeFor: e.target.value })}
                />
              )}

              {isEWallet && method.id === value.method && (
                <FormField
                  id="pay-mobile"
                  label={`${method.title} number`}
                  icon={<PhoneIcon />}
                  type="tel"
                  inputMode="tel"
                  placeholder="09XX XXX XXXX"
                  value={value.mobileNumber}
                  onChange={(e) => update({ mobileNumber: e.target.value })}
                  error={errors.mobileNumber}
                />
              )}

              {method.id === 'bank' && (
                <p className="payment-step__bank-note">
                  Transfer within 24 hours to keep your slot. We'll confirm by
                  text once the payment lands.
                </p>
              )}
            </ChoiceCard>
          ))}
        </div>

        <div className="payment-step__promo">
          <FormField
            id="pay-promo"
            label="Promo code"
            icon={<TagIcon />}
            optional
            placeholder="e.g. FIRST10"
            value={value.promo}
            onChange={(e) => update({ promo: e.target.value.toUpperCase() })}
            error={errors.promo}
          />
          <button
            type="button"
            className="payment-step__promo-btn"
            onClick={onApplyPromo}
            disabled={!value.promo.trim()}
          >
            Apply
          </button>
        </div>

        {value.promoApplied && (
          <p className="payment-step__promo-ok">
            {value.promoApplied} applied — {value.promoApplied === 'FIRST10' ? '10% off your water' : 'free delivery'}.
          </p>
        )}
      </section>

      <section className="payment-step__review">
        <h2 className="order-page__section-title">Check before you order</h2>

        <div className="payment-step__review-row">
          <span className="payment-step__review-icon" aria-hidden="true">
            <MapPinIcon />
          </span>
          <div>
            <h3 className="payment-step__review-label">Delivering to</h3>
            <p className="payment-step__review-value">{addressSummary}</p>
          </div>
          <button type="button" className="payment-step__edit" onClick={onEditAddress}>
            <PencilIcon />
            Edit
          </button>
        </div>

        <div className="payment-step__review-row">
          <span className="payment-step__review-icon" aria-hidden="true">
            <ClockIcon size={20} />
          </span>
          <div>
            <h3 className="payment-step__review-label">Arriving</h3>
            <p className="payment-step__review-value">{scheduleSummary}</p>
          </div>
          <button type="button" className="payment-step__edit" onClick={onEditSchedule}>
            <PencilIcon />
            Edit
          </button>
        </div>

        <label className="payment-step__terms">
          <input
            type="checkbox"
            checked={value.acceptedTerms}
            onChange={(e) => update({ acceptedTerms: e.target.checked })}
          />
          <span>
            I'll return the empty bottles on delivery and I accept the 50 PHP
            per-bottle fee if I can't.
          </span>
        </label>
        {errors.acceptedTerms && (
          <p className="payment-step__terms-error">{errors.acceptedTerms}</p>
        )}
      </section>
    </>
  )
}
