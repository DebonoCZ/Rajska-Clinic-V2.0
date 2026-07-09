import { Link, useParams } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from '../components/Placeholders.jsx'
import VoucherCta from '../components/VoucherCta.jsx'
import BookingSection from '../components/BookingSection.jsx'
import DoctorHelpCta from '../components/DoctorHelpCta.jsx'
import NotFoundPage from './NotFoundPage.jsx'

/* Stránka oblasti péče (estetická dermatologie / dermatologie) —
   bloky ošetření s reálnými texty, odkazy na ceník a detaily služeb. */
export default function ServiceAreaPage() {
  const { areaSlug } = useParams()
  const { serviceAreas, services } = useCms()

  const area = serviceAreas.find((a) => a.slug === areaSlug)
  if (!area) return <NotFoundPage />

  const serviceName = (slug) => services.find((s) => s.slug === slug)?.name

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Drobečková navigace">
            <Link to="/sluzby">služby</Link>
            <span aria-hidden="true"> / </span>
            <span>{area.breadcrumb}</span>
          </nav>
          <h1 className="section__title">{area.name}</h1>
        </div>
      </section>

      {area.blocks.map((block, i) => (
        <section key={block.id} className={`section ${i % 2 === 1 ? 'section--alt' : ''}`} id={block.id}>
          <div className={`container area-block ${i % 2 === 1 ? 'area-block--reverse' : ''}`}>
            <div className="area-block__body">
              <Link
                to={`/cenik#kategorie-${block.pricelistCategoryId}`}
                className="area-block__pricelink"
              >
                zobrazit ceník
              </Link>
              <h2 className="section__title section__title--small">{block.title}</h2>
              {block.paragraphs.map((p, j) => (
                <p key={j} className="area-block__text">
                  {p}
                </p>
              ))}
              {block.bullets.length > 0 && (
                <ul className="area-block__bullets">
                  {block.bullets.map((b) =>
                    b.serviceSlug ? (
                      <li key={b.label}>
                        <Link to={`/sluzby/${b.serviceSlug}`} title={`Detail: ${serviceName(b.serviceSlug)}`}>
                          {b.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={b.label}>
                        <span>{b.label}</span>
                      </li>
                    )
                  )}
                </ul>
              )}
              {block.serviceLink && (
                <p className="area-block__servicelink">
                  <Link to={`/sluzby/${block.serviceLink.serviceSlug}`}>
                    {block.serviceLink.label} →
                  </Link>
                </p>
              )}
            </div>
            <ImagePlaceholder label={block.photo} ratio="4 / 3" className="area-block__photo" />
          </div>
        </section>
      ))}

      {/* CTA box s lékařem — pomoc s výběrem ošetření */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <DoctorHelpCta
            doctorId="lucie-rajska"
            title="Nevíte, které ošetření je pro vás to pravé?"
            text="Nemusíte vybírat sami. Na nezávazné konzultaci posoudíme stav vaší pleti a doporučíme jen to, co má pro vás skutečně smysl — někdy je to i méně, než čekáte."
          />
        </div>
      </section>

      <VoucherCta />

      <BookingSection
        id="kontakt-oblast"
        eyebrow="Rychlý kontakt"
        title="Objednejte se na konzultaci"
      />
    </>
  )
}
