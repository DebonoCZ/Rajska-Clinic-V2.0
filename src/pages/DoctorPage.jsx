import { Link, useParams } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder, VideoPlaceholder } from '../components/Placeholders.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import NotFoundPage from './NotFoundPage.jsx'

/* Profil člena týmu s automatickým výpisem služeb (reverzní vazba ze services.json). */
export default function DoctorPage() {
  const { slug } = useParams()
  const { doctors, services, site } = useCms()

  const doctor = doctors.find((d) => d.slug === slug)
  if (!doctor) return <NotFoundPage />

  const doctorServices = services.filter((s) => doctor.serviceSlugs.includes(s.slug))

  return (
    <>
      <section className="section doctor-profile">
        <div className="container doctor-profile__grid">
          <div className="doctor-profile__media">
            <ImagePlaceholder label={doctor.photo} ratio="4 / 5" />
          </div>
          <div className="doctor-profile__body">
            <p className="section__eyebrow">{doctor.title}</p>
            <h1 className="section__title">{doctor.name}</h1>
            <p className="doctor-profile__bio">{doctor.bio}</p>
            {doctor.instagram && (
              <p className="doctor-profile__instagram">
                <a href={doctor.instagram} target="_blank" rel="noreferrer">
                  Instagram →
                </a>
              </p>
            )}
            <Link to="/#kontakt" className="btn btn--primary">
              {site.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {doctor.hasVideoMedallion && (
        <section className="section section--alt">
          <div className="container container--narrow">
            <h2 className="section__title section__title--small">Video medailonek</h2>
            <VideoPlaceholder label={`VIDEO — medailonek ${doctor.name}`} />
          </div>
        </section>
      )}

      {doctorServices.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section__title section__title--small">Služby, které provádí</h2>
            <div className="grid grid--services">
              {doctorServices.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
