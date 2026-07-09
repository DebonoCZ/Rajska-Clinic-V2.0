import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from './Placeholders.jsx'

/* Kontaktní box vedle rezervačního formuláře — telefon, e-mail, adresa,
   ordinační hodiny a recepční s indikací dostupnosti. */
export default function ContactCard() {
  const { site, doctors } = useCms()
  const { contact, receptionist } = site
  const person = doctors.find((d) => d.id === receptionist.doctorId)

  return (
    <aside className="contact-card">
      {person && (
        <div className="contact-card__person">
          <div className="contact-card__avatar">
            <ImagePlaceholder label={person.photo} ratio="1 / 1" />
            {receptionist.isOnline && <span className="contact-card__online-dot" title="Online" />}
          </div>
          <div>
            <p className="contact-card__person-name">{person.name}</p>
            <p className="contact-card__person-role">
              {person.title}
              {receptionist.isOnline && <span className="contact-card__online-label">· online</span>}
            </p>
            <p className="contact-card__person-note">{receptionist.note}</p>
          </div>
        </div>
      )}

      <ul className="contact-card__list">
        <li>
          <span className="contact-card__label">Zavolejte nám</span>
          <a href={`tel:${contact.phone.replace(/[\s()]/g, '')}`}>{contact.phone}</a>
        </li>
        <li>
          <span className="contact-card__label">Napište nám</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <span className="contact-card__label">Kde nás najdete</span>
          <span>{contact.address}</span>
        </li>
        <li>
          <span className="contact-card__label">Ordinační hodiny</span>
          <span>
            {contact.openingHours.map((row) => (
              <span key={row.days} className="contact-card__hours-row">
                {row.days}: {row.hours}
              </span>
            ))}
          </span>
        </li>
      </ul>

      <p className="contact-card__note">{contact.bookingNote}</p>
    </aside>
  )
}
