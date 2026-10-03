import './ContainerOption.css'

export default function ContainerOption({
  label,
  sublabel,
  price,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={
        'container-option' + (selected ? ' container-option--selected' : '')
      }
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="container-option__icon" aria-hidden="true">
        <DropletIcon />
      </span>
      <span className="container-option__label">{label}</span>
      <span className="container-option__sublabel">{sublabel}</span>
      <span className="container-option__price">{price}</span>
    </button>
  )
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path
        d="M12 3C12 3 5 11.2 5 15.5A7 7 0 0 0 19 15.5C19 11.2 12 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  )
}
