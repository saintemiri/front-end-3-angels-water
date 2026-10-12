import { useState } from 'react'
import {
  Bell,
  Check,
  ChevronLeft,
  LockKeyhole,
  Monitor,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './CustomerSettings.css'

const STORAGE_KEY = 'customer-account-settings'

const DEFAULT_SETTINGS = {
  profile: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  preferences: {
    theme: 'light',
    orderUpdates: true,
    deliveryNotifications: true,
    promotions: false,
  },
}

function loadSettings() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_SETTINGS

    const parsed = JSON.parse(saved)
    return {
      profile: { ...DEFAULT_SETTINGS.profile, ...parsed.profile },
      preferences: { ...DEFAULT_SETTINGS.preferences, ...parsed.preferences },
    }
  } catch (error) {
    console.error('Unable to load customer settings.', error)
    return DEFAULT_SETTINGS
  }
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      style={{ borderRadius: '9999px' }}
      className={`customer-settings__toggle${checked ? ' is-on' : ''}`}
    >
      <span style={{ borderRadius: '50%' }} />
    </button>
  )
}

function PreferenceRow({ title, description, checked, onChange }) {
  return (
    <div className="customer-settings__preference">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

export default function CustomerSettings() {
  const [settings, setSettings] = useState(loadSettings)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const persistSettings = (nextSettings, successMessage) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings))
      setSettings(nextSettings)
      document.documentElement.dataset.theme =
        nextSettings.preferences.theme === 'dark' ? 'dark' : 'light'
      setError('')
      setMessage(successMessage)
    } catch (storageError) {
      console.error('Unable to save customer settings.', storageError)
      setMessage('')
      setError('Your settings could not be saved. Please try again.')
    }
  }

  const updatePreference = (key, value) => {
    const nextSettings = {
      ...settings,
      preferences: { ...settings.preferences, [key]: value },
    }
    persistSettings(nextSettings, 'Preference saved.')
  }

  const handleProfileSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextSettings = {
      ...settings,
      profile: {
        name: String(formData.get('name')).trim(),
        email: String(formData.get('email')).trim(),
        phone: String(formData.get('phone')).trim(),
        address: String(formData.get('address')).trim(),
      },
    }
    persistSettings(nextSettings, 'Your profile details have been saved.')
  }

  return (
    <section className="customer-settings">
      <div className="container customer-settings__inner">
        <Link to="/" className="customer-settings__back">
          <ChevronLeft size={16} aria-hidden="true" />
          Back to customer portal
        </Link>

        <header className="customer-settings__header">
          <span className="customer-settings__eyebrow">YOUR ACCOUNT</span>
          <h1>Account settings</h1>
          <p>Manage your personal details and how we keep you updated.</p>
        </header>

        {message && (
          <p className="customer-settings__message" role="status">
            <Check size={17} aria-hidden="true" />
            {message}
          </p>
        )}
        {error && (
          <p className="customer-settings__error" role="alert">
            {error}
          </p>
        )}

        <div className="customer-settings__grid">
          <section className="customer-settings__card" aria-labelledby="profile-heading">
            <div className="customer-settings__card-heading">
              <span className="customer-settings__icon"><UserRound size={19} /></span>
              <div>
                <h2 id="profile-heading">Profile details</h2>
                <p>Keep your contact and delivery information up to date.</p>
              </div>
            </div>

            <form className="customer-settings__form" onSubmit={handleProfileSubmit}>
              <label>
                Full name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  defaultValue={settings.profile.name}
                  placeholder="Enter your name"
                  required
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={settings.profile.email}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  defaultValue={settings.profile.phone}
                  placeholder="Enter your phone number"
                />
              </label>
              <label>
                Default delivery address
                <textarea
                  name="address"
                  autoComplete="street-address"
                  defaultValue={settings.profile.address}
                  placeholder="Enter your delivery address"
                  rows={3}
                />
              </label>
              <button type="submit" className="customer-settings__primary">
                Save profile
              </button>
            </form>
          </section>

          <div className="customer-settings__side">
            <section className="customer-settings__card" aria-labelledby="appearance-heading">
              <div className="customer-settings__card-heading">
                <span className="customer-settings__icon"><Monitor size={19} /></span>
                <div>
                  <h2 id="appearance-heading">Appearance</h2>
                  <p>Choose your preferred interface theme.</p>
                </div>
              </div>
              <div className="customer-settings__theme">
                <span>
                  {settings.preferences.theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
                  {settings.preferences.theme === 'light' ? 'Light mode' : 'Dark mode'}
                </span>
                <select
                  value={settings.preferences.theme}
                  onChange={(event) => updatePreference('theme', event.target.value)}
                  aria-label="Interface theme"
                  className="customer-settings__theme-select"
                >
                  <option value="light">Light mode</option>
                  <option value="dark">Dark mode</option>
                </select>
              </div>
              <p className="customer-settings__hint">
                    The selected theme is applied across the customer portal.
              </p>
            </section>

            <section className="customer-settings__card" aria-labelledby="notifications-heading">
              <div className="customer-settings__card-heading">
                <span className="customer-settings__icon"><Bell size={19} /></span>
                <div>
                  <h2 id="notifications-heading">Notifications</h2>
                  <p>Choose which updates you want to receive.</p>
                </div>
              </div>
              <div className="customer-settings__preferences">
                <PreferenceRow
                  title="Order updates"
                  description="Changes to your order status."
                  checked={settings.preferences.orderUpdates}
                  onChange={() => updatePreference('orderUpdates', !settings.preferences.orderUpdates)}
                />
                <PreferenceRow
                  title="Delivery notifications"
                  description="Updates about scheduled deliveries."
                  checked={settings.preferences.deliveryNotifications}
                  onChange={() =>
                    updatePreference(
                      'deliveryNotifications',
                      !settings.preferences.deliveryNotifications,
                    )
                  }
                />
                <PreferenceRow
                  title="Offers and announcements"
                  description="Occasional news and special offers."
                  checked={settings.preferences.promotions}
                  onChange={() => updatePreference('promotions', !settings.preferences.promotions)}
                />
              </div>
            </section>

            <section className="customer-settings__security">
              <span className="customer-settings__icon"><LockKeyhole size={19} /></span>
              <div>
                <h2>Password and security</h2>
                <p>Need to update your password?</p>
                <Link to="/forgot-password">Reset password</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
