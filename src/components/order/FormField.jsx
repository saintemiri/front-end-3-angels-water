import { AlertIcon } from './icons.jsx'
import './FormField.css'

export default function FormField({
  id,
  label,
  icon,
  hint,
  error,
  optional = false,
  as = 'input',
  ...inputProps
}) {
  const Tag = as
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined

  return (
    <div className={'form-field' + (error ? ' form-field--error' : '')}>
      <label className="form-field__label" htmlFor={id}>
        {label}
        {optional && <span className="form-field__optional">Optional</span>}
      </label>

      <div className="form-field__control">
        {icon && (
          <span className="form-field__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <Tag
          id={id}
          className="form-field__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />
      </div>

      {error ? (
        <p className="form-field__error" id={`${id}-error`}>
          <AlertIcon />
          {error}
        </p>
      ) : (
        hint && (
          <p className="form-field__hint" id={`${id}-hint`}>
            {hint}
          </p>
        )
      )}
    </div>
  )
}
