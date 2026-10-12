import { ArrowUpRight, Globe2, Mail, Phone } from 'lucide-react'
import './Contact.css'

const contactMethods = [
  {
    title: 'Email us',
    value: '3angelswaterstation@gmail.com',
    href: 'mailto:3angelswaterstation@gmail.com',
    description: 'Send us your questions and we’ll get back to you.',
    icon: Mail,
    action: 'Send an email',
  },
  {
    title: 'Call us',
    value: '0123-456-789',
    href: 'tel:0123-456-789',
    description: 'Talk to our team for help with your order.',
    icon: Phone,
    action: 'Call our team',
  },
  {
    title: 'Find us on Facebook',
    value: '3 Angels Water Station',
    href: '#',
    description: 'Follow our page for updates and announcements.',
    icon: Globe2,
    action: 'Visit our page',
  },
]

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="container contact-page__inner">
        <div className="contact-page__hero">
          <span className="contact-page__eyebrow">WE’RE HERE TO HELP</span>
          <h1>Let’s get in touch.</h1>
          <p>
            Questions about an order or our services? Reach out using the
            contact option that works best for you.
          </p>
        </div>

        <div className="contact-page__cards">
          {contactMethods.map(({ title, value, href, description, icon: Icon, action }) => (
            <article className="contact-card" key={title}>
              <div className="contact-card__icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h2>{title}</h2>
              <p className="contact-card__description">{description}</p>
              <a className="contact-card__value" href={href}>
                {value}
              </a>
              <a className="contact-card__action" href={href}>
                {action}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <div className="contact-page__note">
          <span className="contact-page__note-mark" aria-hidden="true">3</span>
          <p>
            <strong>3 Angels Water Station</strong>
            <span>Here to keep your day flowing.</span>
          </p>
        </div>
      </div>
    </section>
  )
}