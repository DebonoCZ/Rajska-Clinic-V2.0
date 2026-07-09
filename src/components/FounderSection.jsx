import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { VideoPlaceholder } from './Placeholders.jsx'

/* Sekce se zakladatelkou a jejím video medailonkem (bod E nabídky). */
export default function FounderSection() {
  const { site } = useCms()
  const founder = site.aboutFounder

  return (
    <section className="section founder" id="o-nas">
      <div className="container founder__grid">
        <div className="founder__media">
          <VideoPlaceholder label={founder.videoLabel} ratio="4 / 5" />
        </div>
        <div className="founder__body">
          <p className="section__eyebrow">{founder.eyebrow}</p>
          <h2 className="section__title">{founder.name}</h2>
          <p className="founder__title">{founder.title}</p>
          <p className="founder__text">{founder.text}</p>
          <div className="founder__actions">
            <Link to={founder.ctaPath} className="btn btn--primary">
              {founder.ctaLabel}
            </Link>
            <a href={`tel:${site.contact.phone.replace(/[\s()]/g, '')}`} className="btn btn--dark">
              {site.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
