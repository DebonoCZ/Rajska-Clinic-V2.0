import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import CategoryTabs from '../components/CategoryTabs.jsx'
import { VideoPlaceholder } from '../components/Placeholders.jsx'
import PressBar from '../components/PressBar.jsx'
import GoogleRating from '../components/GoogleRating.jsx'
import FounderSection from '../components/FounderSection.jsx'
import VoucherCta from '../components/VoucherCta.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import TeamSlider from '../components/TeamSlider.jsx'
import BookingSection from '../components/BookingSection.jsx'

export default function HomePage() {
  const { site, services, doctors } = useCms()
  const [serviceTab, setServiceTab] = useState('Estetická medicína')
  /* Nejoblíbenější = první 4 v pořadí CMS pro zvolenou kategorii */
  const popularServices = services.filter((s) => s.category === serviceTab).slice(0, 4)

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
            <div className="hero__actions">
              <Link to="/#kontakt" className="btn btn--primary btn--large">
                {site.ctaLabel}
              </Link>
              <GoogleRating />
            </div>
          </div>
        </div>
      </section>

      {/* MŮŽETE NÁS ZNÁT Z — rolující pás log */}
      <PressBar />

      {/* ZAKLADATELKA + VIDEO MEDAILONEK */}
      <FounderSection />

      {/* NEJOBLÍBENĚJŠÍ SLUŽBY — tabs + 4 karty + odkaz na vše */}
      <section className="section section--alt" id="sluzby">
        <div className="container">
          <p className="section__eyebrow">Naše péče</p>
          <h2 className="section__title">Nejoblíbenější služby</h2>
          <CategoryTabs
            categories={['Estetická medicína', 'Dermatologie']}
            active={serviceTab}
            onChange={setServiceTab}
          />
          <div className="grid grid--services grid--services-4">
            {popularServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="section__more">
            <Link to="/sluzby" className="btn btn--primary btn--large">
              Zobrazit všechny služby
            </Link>
          </div>
        </div>
      </section>

      {/* REFERENCE */}
      <section className="section" id="reference">
        <div className="container">
          <p className="section__eyebrow">Řekli o nás</p>
          <h2 className="section__title">Co o nás říkají klienti</h2>
          <div className="references__rating">
            <GoogleRating />
          </div>
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

      {/* TÝM */}
      <section className="section section--alt" id="tym">
        <div className="container">
          <p className="section__eyebrow">Kdo se o vás postará</p>
          <h2 className="section__title">Náš sehraný tým</h2>
          <TeamSlider doctors={doctors} />
        </div>
      </section>

      {/* DÁRKOVÝ VOUCHER */}
      <VoucherCta />

      {/* KONTAKT + FORMULÁŘ */}
      <BookingSection id="kontakt" />
    </>
  )
}
