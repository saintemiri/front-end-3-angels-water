import ChoiceCard from './ChoiceCard.jsx'
import FormField from './FormField.jsx'
import { BoltIcon, CalendarIcon, ClockIcon } from './icons.jsx'
import './ScheduleStep.css'

export const EXPRESS_SURCHARGE = 30

export const TIME_SLOTS = [
  { id: 'am-early', label: '8:00 – 10:00 AM' },
  { id: 'am-late', label: '10:00 AM – 12:00 PM' },
  { id: 'pm-early', label: '1:00 – 3:00 PM' },
  { id: 'pm-mid', label: '3:00 – 5:00 PM' },
  { id: 'pm-late', label: '5:00 – 7:00 PM' },
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function getDeliveryDates(from = new Date()) {
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(from)
    date.setDate(from.getDate() + offset)

    return {
      id: date.toISOString().slice(0, 10),
      dayName: offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : DAY_NAMES[date.getDay()],
      dayNumber: date.getDate(),
      month: MONTH_NAMES[date.getMonth()],
      isSunday: date.getDay() === 0,
    }
  })
}

function slotUnavailable(dateId, slotId, dates) {
  const isToday = dates[0]?.id === dateId
  if (!isToday) return false
  const hour = new Date().getHours()
  if (slotId === 'am-early') return hour >= 8
  if (slotId === 'am-late') return hour >= 10
  if (slotId === 'pm-early') return hour >= 13
  if (slotId === 'pm-mid') return hour >= 15
  if (slotId === 'pm-late') return hour >= 17
  return false
}

export default function ScheduleStep({ value, onChange, errors, dates }) {
  const update = (patch) => onChange({ ...value, ...patch })
  const scheduled = value.speed === 'scheduled'

  return (
    <section className="order-page__card">
      <h2 className="order-page__section-title">When do you need it?</h2>
      <p className="order-step__lead">
        Express goes out with the next available rider. Scheduled lets you lock
        in a two-hour window.
      </p>

      <div className="schedule-step__speeds" role="radiogroup" aria-label="Delivery speed">
        <ChoiceCard
          icon={<BoltIcon />}
          title="Express delivery"
          description="Arrives within 2 hours during station hours"
          meta={`+${EXPRESS_SURCHARGE} PHP`}
          selected={value.speed === 'express'}
          onSelect={() => update({ speed: 'express' })}
        />
        <ChoiceCard
          icon={<CalendarIcon />}
          title="Schedule a delivery"
          description="Choose the day and the time window"
          meta="Free"
          selected={scheduled}
          onSelect={() => update({ speed: 'scheduled' })}
        />
      </div>

      {scheduled && (
        <div className="schedule-step__picker">
          <div className="schedule-step__group">
            <h3 className="schedule-step__group-title">Delivery date</h3>
            <div className="schedule-step__dates" role="radiogroup" aria-label="Delivery date">
              {dates.map((date) => {
                const selected = date.id === value.date
                return (
                  <button
                    key={date.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={date.isSunday}
                    className={
                      'date-chip' +
                      (selected ? ' date-chip--selected' : '') +
                      (date.isSunday ? ' date-chip--closed' : '')
                    }
                    onClick={() => update({ date: date.id, slot: '' })}
                  >
                    <span className="date-chip__day">{date.dayName}</span>
                    <span className="date-chip__number">{date.dayNumber}</span>
                    <span className="date-chip__month">
                      {date.isSunday ? 'Closed' : date.month}
                    </span>
                  </button>
                )
              })}
            </div>
            {errors.date && <p className="schedule-step__error">{errors.date}</p>}
          </div>

          <div className="schedule-step__group">
            <h3 className="schedule-step__group-title">Time window</h3>
            <div className="schedule-step__slots" role="radiogroup" aria-label="Time window">
              {TIME_SLOTS.map((slot) => {
                const unavailable = slotUnavailable(value.date, slot.id, dates)
                const selected = slot.id === value.slot
                return (
                  <button
                    key={slot.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={unavailable}
                    className={
                      'slot-chip' +
                      (selected ? ' slot-chip--selected' : '') +
                      (unavailable ? ' slot-chip--full' : '')
                    }
                    onClick={() => update({ slot: slot.id })}
                  >
                    <ClockIcon size={15} />
                    <span>{slot.label}</span>
                    {unavailable && <span className="slot-chip__tag">Passed</span>}
                  </button>
                )
              })}
            </div>
            {errors.slot && <p className="schedule-step__error">{errors.slot}</p>}
          </div>
        </div>
      )}

      <div className="schedule-step__notes">
        <FormField
          id="schedule-notes"
          as="textarea"
          label="Notes for the rider"
          optional
          rows={3}
          placeholder="e.g. text on arrival, leave the empties by the gate"
          value={value.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />
      </div>
    </section>
  )
}
