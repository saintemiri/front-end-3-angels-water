import './ChoiceCard.css'

export default function ChoiceCard({
  icon,
  title,
  description,
  meta,
  badge,
  selected,
  disabled = false,
  onSelect,
  children,
}) {
  const className = [
    'choice-card',
    selected && 'choice-card--selected',
    disabled && 'choice-card--disabled',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <button
        type="button"
        className="choice-card__button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        onClick={onSelect}
      >
        <span className="choice-card__mark" aria-hidden="true" />

        {icon && (
          <span className="choice-card__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <span className="choice-card__body">
          <span className="choice-card__title">
            {title}
            {badge && <span className="choice-card__badge">{badge}</span>}
          </span>
          {description && (
            <span className="choice-card__description">{description}</span>
          )}
        </span>

        {meta && <span className="choice-card__meta">{meta}</span>}
      </button>

      {selected && children && (
        <div className="choice-card__extra">{children}</div>
      )}
    </div>
  )
}
