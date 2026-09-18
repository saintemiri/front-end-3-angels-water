import './StepIndicator.css'

const STEPS = ['Selection', 'Address', 'Schedule', 'Payment']

/**
 * Reusable progress indicator for multi-step flows: one continuous
 * track with a proportional fill, and labels underneath.
 */
export default function StepIndicator({ currentStep }) {
  const fillPercent = (currentStep / STEPS.length) * 100

  return (
    <div className="step-indicator">
      <div className="step-indicator__track">
        <div
          className="step-indicator__fill"
          style={{ width: `${fillPercent}%` }}
        />
      </div>
      <ol className="step-indicator__labels">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1
          const state =
            stepNumber < currentStep
              ? 'done'
              : stepNumber === currentStep
                ? 'active'
                : 'upcoming'

          return (
            <li
              key={label}
              className={`step-indicator__label step-indicator__label--${state}`}
            >
              {stepNumber}. {label}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
