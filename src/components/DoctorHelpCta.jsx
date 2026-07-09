import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from './Placeholders.jsx'

/* CTA box s lékařem — „Nevíte si rady? Pomůžeme vám vybrat."
   doctorId = garant ošetření (ve Webflow reference na kolekci Tým). */
export default function DoctorHelpCta({
  doctorId,
  title = 'Nevíte si rady s výběrem ošetření?',
  text = 'Napište nám nebo zavolejte — na nezávazné konzultaci společně probereme, co vás trápí, a doporučíme jen to, co má pro vás smysl.',
}) {
  const { doctors, site } = useCms()
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0]

  return (
    <div className="doctor-help">
      <div className="doctor-help__photo-wrap">
        <ImagePlaceholder label={doctor.photo} ratio="4 / 5" className="doctor-help__photo" />
      </div>
      <div className="doctor-help__body">
        <p className="doctor-help__eyebrow">Váš lékař pro toto ošetření</p>
        <h3 className="doctor-help__title">{title}</h3>
        <p className="doctor-help__text">{text}</p>
        <p className="doctor-help__doctor">
          <Link to={`/tym/${doctor.slug}`}>{doctor.name}</Link>
          <span> — {doctor.title}</span>
        </p>
        <div className="doctor-help__actions">
          <a href={`tel:${site.contact.phone.replace(/[\s()]/g, '')}`} className="btn btn--primary">
            {site.contact.phone}
          </a>
          <Link to="/#kontakt" className="btn btn--dark">
            Napsat zprávu
          </Link>
        </div>
      </div>
    </div>
  )
}
