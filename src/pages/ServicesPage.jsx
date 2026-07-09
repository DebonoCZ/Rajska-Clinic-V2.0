import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from '../components/Placeholders.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import VoucherCta from '../components/VoucherCta.jsx'

/* Rozcestník služeb: oblasti péče (estetická dermatologie / dermatologie)
   a pod nimi všechna ošetření s vlastní landing page. */
export default function ServicesPage() {
  const { services, serviceAreas } = useCms()

  const groups = [
    { name: 'Estetická medicína', services: services.filter((s) => s.category === 'Estetická medicína') },
    { name: 'Dermatologie', services: services.filter((s) => s.category === 'Dermatologie') },
    { name: 'Plastická chirurgie', services: services.filter((s) => s.category === 'Plastická chirurgie') },
  ]

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section__eyebrow">Naše péče</p>
          <h1 className="section__title">Služby</h1>
          <p className="section__lead">
            Od preventivní dermatologie po estetickou medicínu. Vyberte si oblast péče,
            nebo rovnou konkrétní ošetření.
          </p>
        </div>
      </section>

      {/* Oblasti péče */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="area-teasers">
            {serviceAreas.map((area) => (
              <Link to={`/${area.slug}`} className="area-teaser" key={area.slug}>
                <ImagePlaceholder label={`FOTO — ${area.name}`} ratio="16 / 9" />
                <div className="area-teaser__body">
                  <h2 className="area-teaser__title">{area.name}</h2>
                  <p className="area-teaser__lead">{area.lead}</p>
                  <span className="area-teaser__more">Zjistit více →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Všechna ošetření podle oblastí */}
      <section className="section section--alt">
        <div className="container">
          <p className="section__eyebrow">Kompletní nabídka</p>
          <h2 className="section__title section__title--small">Všechna ošetření</h2>
          {groups.map(
            (group) =>
              group.services.length > 0 && (
                <div className="services-group" key={group.name}>
                  <h3 className="services-group__heading">{group.name}</h3>
                  <div className="grid grid--services">
                    {group.services.map((s) => (
                      <ServiceCard key={s.slug} service={s} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      <VoucherCta />
    </>
  )
}
