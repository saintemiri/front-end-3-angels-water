import './QuantityStepper.css'

/** Reusable +/- quantity control. */
export default function QuantityStepper({ value, onChange, min = 1, max = 20 }) {
  const decrease = () => onChange(Math.max(min, value - 1))
  const increase = () => onChange(Math.min(max, value + 1))

  return (
    <div className="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="quantity-stepper__value">{value}</span>
      <button
        type="button"
        className="quantity-stepper__btn quantity-stepper__btn--primary"
        onClick={increase}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
