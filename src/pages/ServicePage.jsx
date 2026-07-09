import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import Accordion from '../components/Accordion.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import BookingForm from '../components/BookingForm.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import { VideoPlaceholder } from '../components/Placeholders.jsx'
import NotFoundPage from './NotFoundPage.jsx'

/* Šablona landing page služby (bod D nabídky) — jedna šablona pro všechny služby. */
export default function ServicePage() {
  const { slug } = useParams()
  const { services, doctors, pricelist } = useCms()
  const [openIds, setOpenIds] = useState([])

  const service = services.find((s) => s.slug === slug)

  /* Ceník služby: automaticky propsané kategorie podle pricelistCategoryIds. */
  const serviceCategories = useMemo(
    () => (service ? pricelist.categories.filter((c) => service.pricelistCategoryIds.includes(c.id)) : []),
    [pricelist, service]
  )

  /* Váš tým pro tuto službu: reverzní vazba z doctors.json (bod B nabídky). */
  const serviceDoctors = useMemo(
    () => (service ? doctors.filter((d) => d.serviceSlugs.includes(service.slug)) : []),
    [doctors, service]
  )

  if (!service) return <NotFoundPage />

  const scrollToForm = () => {
    document.getElementById('objednat')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggle = (id) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <>
      {/* 1. Hero */}
      <section className="page-hero page-hero--service">
        <div className="container">
          <p className="section__eyebrow">{service.category}</p>
          <h1 className="section__title">{service.name}</h1>
          <p className="service__claim">{service.heroClaim}</p>
          <button className="btn btn--primary btn--large" onClick={scrollToForm}>
            Objednat se
          </button>
        </div>
      </section>

      {/* 2. Popis + benefity */}
      <section className="section">
        <div className="container service__intro">
          <div>
            <h2 className="section__subtitle">O ošetření</h2>
            <p className="service__description">{service.shortDescription}</p>
          </div>
          <div>
            <h2 className="section__subtitle">Proč k nám</h2>
            <ul className="service__benefits">
              {service.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Před / po */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title section__title--small">Před / po</h2>
          <p className="section__lead">Reálné výsledky našich pacientů. Přirozené, ne přehnané.</p>
          <BeforeAfter count={service.beforeAfter} serviceName={service.name} />
        </div>
      </section>

      {/* 4. Ceník služby — stejná akordeon komponenta, jen filtrovaná */}
      {serviceCategories.length > 0 && (
        <section className="section">
          <div className="container container--narrow">
            <h2 className="section__title section__title--small">Ceník — {service.name}</h2>
            <Accordion categories={serviceCategories} openIds={openIds} onToggle={toggle} />
            <p className="service__pricelist-link">
              <Link to="/cenik">Kompletní ceník všech ošetření →</Link>
            </p>
          </div>
        </section>
      )}

      {/* 5. Váš tým pro tuto službu */}
      {serviceDoctors.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title section__title--small">Váš tým pro tuto službu</h2>
            <div className="grid grid--doctors">
              {serviceDoctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Video medailonek */}
      {service.hasVideoMedallion && (
        <section className="section">
          <div className="container container--narrow">
            <h2 className="section__title section__title--small">Jak ošetření probíhá</h2>
            <VideoPlaceholder label={`VIDEO — medailonek služby ${service.name}`} />
          </div>
        </section>
      )}

      {/* 7. Rezervační formulář */}
      <section className="section section--alt" id="objednat">
        <div className="container container--narrow">
          <h2 className="section__title section__title--small">Objednat se na konzultaci</h2>
          <p className="section__lead">Vyplňte formulář a my se vám ozveme s návrhem termínu.</p>
          <BookingForm preselectedService={service.slug} />
        </div>
      </section>
    </>
  )
}
