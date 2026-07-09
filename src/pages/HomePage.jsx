import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { VideoPlaceholder } from '../components/Placeholders.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import BookingForm from '../components/BookingForm.jsx'

export default function HomePage() {
  const { site, services, doctors } = useCms()

  return (
    <>
      {/* HERO — video přes celou šířku (bod A nabídky) */}
      <section className="hero">
        <VideoPlaceholder label="VIDEO — hero, prostory kliniky" ratio="21 / 9" className="hero__video" />
        <div className="hero__overlay">
          <div className="container">
            <h1 className="hero__claim">
              {site.heroClaim.includes('–') ? (
                <>
                  {site.heroClaim.split('–')[0]}–{' '}
                  <span className="gold-text">{site.heroClaim.split('–').slice(1).join('–').trim()}</span>
                </>
              ) : (
                site.heroClaim
              )}
            </h1>
            <p className="hero__subclaim">{site.heroSubclaim}</p>
            <Link to="/#kontakt" className="btn btn--primary btn--large">
              {site.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* SLUŽBY */}
      <section className="section" id="sluzby">
        <div className="container">
          <p className="section__eyebrow">Naše péče</p>
          <h2 className="section__title">Služby</h2>
          <p className="section__lead">
            Od preventivní dermatologie po estetickou medicínu. Vždy s jediným cílem —
            abyste se cítili dobře ve své kůži.
          </p>
          <div className="grid grid--services">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* TÝM */}
      <section className="section section--alt" id="tym">
        <div className="container">
          <p className="section__eyebrow">Kdo se o vás postará</p>
          <h2 className="section__title">Náš tým</h2>
          <div className="grid grid--doctors">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE */}
      <section className="section" id="reference">
        <div className="container">
          <p className="section__eyebrow">Řekli o nás</p>
          <h2 className="section__title">Reference</h2>
          <div className="grid grid--references">
            {site.references.map((ref) => (
              <blockquote key={ref.author} className="reference">
                <p>„{ref.text}"</p>
                <cite>— {ref.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT + FORMULÁŘ */}
      <section className="section section--alt" id="konzultace">
        <div className="container container--narrow">
          <p className="section__eyebrow">Uděláme si na vás čas</p>
          <h2 className="section__title">Domluvte si konzultaci</h2>
          <p className="section__lead">
            Napište nám a recepce se vám ozve nejpozději následující pracovní den.
          </p>
          <BookingForm />
        </div>
      </section>
    </>
  )
}
