import ChoiceCard from './ChoiceCard.jsx'
import FormField from './FormField.jsx'
import {
  HomeIcon,
  BuildingIcon,
  PlusIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
  SignpostIcon,
} from './icons.jsx'
import './AddressStep.css'

export const SAVED_ADDRESSES = [
  {
    id: 'home',
    label: 'Home',
    icon: 'home',
    contactName: 'Maria Santos',
    phone: '0917 555 0134',
    lines: ['123 BS Aquino Ave,', 'Sto. Niño,', 'Baliwag, Bulacan'],
    zone: 'Zone 1',
  },
]

export default function AddressStep({ value, onChange, errors }) {
  const update = (patch) => onChange({ ...value, ...patch })
  const field = (key) => (e) => update({ [key]: e.target.value })

  return (
    <section className="order-page__card">
      <h2 className="order-page__section-title">Where should we deliver?</h2>
      <p className="order-step__lead">
        Pick a saved address or add a new one. Our riders cover Baliwag and
        nearby barangays.
      </p>

      <div className="address-step__list" role="radiogroup" aria-label="Delivery address">
        {SAVED_ADDRESSES.map((addr) => (
          <ChoiceCard
            key={addr.id}
            icon={addr.icon === 'home' ? <HomeIcon /> : <BuildingIcon />}
            title={addr.label}
            description={`${addr.lines.join(' ')} · ${addr.contactName}, ${addr.phone}`}
            meta={addr.zone}
            selected={value.mode === 'saved' && value.savedId === addr.id}
            onSelect={() => update({ mode: 'saved', savedId: addr.id })}
          />
        ))}

        <ChoiceCard
          icon={<PlusIcon />}
          title="Deliver somewhere else"
          description="Add a new address for this order"
          selected={value.mode === 'new'}
          onSelect={() => update({ mode: 'new' })}
        >
          <div className="address-step__form">
            <div className="address-step__row">
              <FormField
                id="addr-contact"
                label="Contact name"
                icon={<UserIcon />}
                placeholder="Who receives the delivery?"
                autoComplete="name"
                value={value.contactName}
                onChange={field('contactName')}
                error={errors.contactName}
              />
              <FormField
                id="addr-phone"
                label="Mobile number"
                icon={<PhoneIcon />}
                type="tel"
                inputMode="tel"
                placeholder="09XX XXX XXXX"
                autoComplete="tel"
                value={value.phone}
                onChange={field('phone')}
                error={errors.phone}
              />
            </div>

            <FormField
              id="addr-street"
              label="House number and street"
              icon={<MapPinIcon />}
              placeholder="e.g. 123 BS Aquino Ave"
              autoComplete="address-line1"
              value={value.street}
              onChange={field('street')}
              error={errors.street}
            />

            <div className="address-step__row">
              <FormField
                id="addr-barangay"
                label="Barangay"
                placeholder="e.g. Sto. Niño"
                value={value.barangay}
                onChange={field('barangay')}
                error={errors.barangay}
              />
              <FormField
                id="addr-city"
                label="City or municipality"
                placeholder="e.g. Baliwag, Bulacan"
                autoComplete="address-level2"
                value={value.city}
                onChange={field('city')}
                error={errors.city}
              />
            </div>

            <FormField
              id="addr-landmark"
              label="Landmark or rider notes"
              icon={<SignpostIcon />}
              optional
              placeholder="e.g. green gate beside the basketball court"
              hint="Helps the rider find you faster on the first trip."
              value={value.landmark}
              onChange={field('landmark')}
            />

            <label className="address-step__save">
              <input
                type="checkbox"
                checked={value.saveForNextTime}
                onChange={(e) => update({ saveForNextTime: e.target.checked })}
              />
              Save this address to my account
            </label>
          </div>
        </ChoiceCard>
      </div>
    </section>
  )
}
