import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'

export default function Footer() {
  const { site, services } = useCms()
  const { contact } = site

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <p className="footer__brand">{site.clinicName}</p>
          <p className="footer__tagline">{site.heroClaim}</p>
          <div className="footer__social">
            <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Kontakt</p>
          <address className="footer__address">
            {contact.address}
            <br />
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </address>
        </div>

        <div className="footer__col">
          <p className="footer__heading">Ordinační hodiny</p>
          <ul className="footer__hours">
            {contact.openingHours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <span>{row.hours}</span>
              </li>
            ))}
          </ul>
          {contact.bookingNote && <p className="footer__note">{contact.bookingNote}</p>}
        </div>

        <div className="footer__col">
          <p className="footer__heading">Služby</p>
          <ul className="footer__links">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/sluzby/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/cenik">Ceník</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>{contact.billing}</p>
        <p>© {new Date().getFullYear()} {site.clinicName} — interaktivní prototyp (Debono Interactive). Nejedná se o produkční web.</p>
      </div>
    </footer>
  )
}
