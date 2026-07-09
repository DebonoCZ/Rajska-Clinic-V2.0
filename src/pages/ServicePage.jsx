import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import Accordion from '../components/Accordion.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import BookingSection from '../components/BookingSection.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import DoctorHelpCta from '../components/DoctorHelpCta.jsx'
import QuickFacts from '../components/QuickFacts.jsx'
import { ImagePlaceholder, VideoPlaceholder } from '../components/Placeholders.jsx'
import NotFoundPage from './NotFoundPage.jsx'

/* Šablona landing page služby (bod D nabídky) — jedna šablona pro všechny služby.
   Struktura: hero + fakta → co řeší / pro koho → jak probíhá → rekonvalescence
   → před/po → ceník → tým + garant → rezervace. */
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
      {/* 1. Hero s fotkou ošetření */}
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="breadcrumb" aria-label="Drobečková navigace">
            <Link to="/sluzby">služby</Link>
            <span aria-hidden="true"> / </span>
            <span>{service.name.toLowerCase()}</span>
          </nav>
          <div className="service-hero__grid">
            <div>
              <p className="section__eyebrow">{service.category}</p>
              <h1 className="section__title">{service.name}</h1>
              <p className="service__claim">{service.heroClaim}</p>
              <p className="service__description">{service.shortDescription}</p>
              <button className="btn btn--primary btn--large" onClick={scrollToForm}>
                Objednat se
              </button>
            </div>
            <ImagePlaceholder
              label={`FOTO — průběh ošetření (${service.name})`}
              ratio="4 / 3"
              className="service-hero__photo"
            />
          </div>
          {/* Rychlá fakta o ošetření */}
          <QuickFacts facts={service.quickFacts} />
        </div>
      </section>

      {/* 2. S čím ošetření pomůže + pro koho je vhodné */}
      <section className="section">
        <div className="container service__intro">
          <div>
            <h2 className="section__subtitle">S čím vám ošetření pomůže</h2>
            <ul className="service__benefits">
              {service.solves.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section__subtitle">Pro koho je vhodné</h2>
            <ul className="service__benefits service__benefits--forwhom">
              {service.forWhom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Jak ošetření probíhá — číslované kroky + video */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section__title section__title--small">Jak ošetření probíhá</h2>
          <div className="steps">
            {service.steps.map((step, i) => (
              <div className="steps__item" key={step.title}>
                <span className="steps__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="steps__title">{step.title}</h3>
                <p className="steps__text">{step.text}</p>
              </div>
            ))}
          </div>
          {service.hasVideoMedallion && (
            <div className="steps__video">
              <VideoPlaceholder label={`VIDEO — jak probíhá ošetření ${service.name}`} />
            </div>
          )}
        </div>
      </section>

      {/* 4. Rekonvalescence a péče po ošetření */}
      <section className="section">
        <div className="container aftercare">
          <div>
            <h2 className="section__title section__title--small">Rekonvalescence</h2>
            <p className="aftercare__text">{service.aftercare.text}</p>
          </div>
          <div className="aftercare__tips">
            <h3 className="aftercare__tips-heading">Na co po ošetření myslet</h3>
            <ul className="service__benefits">
              {service.aftercare.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Před / po — jen u služeb s vizuálním výsledkem */}
      {service.beforeAfter > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title section__title--small">Před / po</h2>
            <p className="section__lead">Reálné výsledky našich pacientů. Přirozené, ne přehnané.</p>
            <BeforeAfter count={service.beforeAfter} serviceName={service.name} />
          </div>
        </section>
      )}

      {/* 6. Ceník služby — stejná akordeon komponenta, jen filtrovaná */}
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

      {/* 7. Garant ošetření — CTA box s lékařem */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <DoctorHelpCta doctorId={service.garantDoctorId} />
        </div>
      </section>

      {/* 8. Váš tým pro tuto službu */}
      {serviceDoctors.length > 0 && (
        <section className="section">
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

      {/* 9. Rezervační formulář s kontaktním boxem */}
      <BookingSection
        id="objednat"
        eyebrow="Objednat se"
        title={`Konzultace — ${service.name}`}
        lead="Vyplňte formulář a my se vám ozveme s návrhem termínu. Nebo nám rovnou zavolejte."
        preselectedService={service.slug}
      />
    </>
  )
}
