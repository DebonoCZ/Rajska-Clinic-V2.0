import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder, VideoPlaceholder } from '../components/Placeholders.jsx'
import GoogleRating from '../components/GoogleRating.jsx'

/* O nás — příběh MUDr. Lucie Rajské vyprávěný jako budování důvěry. */
export default function AboutPage() {
  const { about, site } = useCms()

  return (
    <>
      {/* Hero příběhu */}
      <section className="page-hero about-hero">
        <div className="container about-hero__grid">
          <div>
            <p className="section__eyebrow">{about.hero.eyebrow}</p>
            <h1 className="section__title">{about.hero.title}</h1>
            <p className="about-hero__lead">{about.hero.lead}</p>
            <div className="about-hero__rating">
              <GoogleRating />
            </div>
          </div>
          <ImagePlaceholder label={about.hero.photo} ratio="4 / 5" className="about-hero__photo" />
        </div>
      </section>

      {/* Kapitoly příběhu — střídavé řazení text/foto */}
      {about.chapters.map((chapter, i) => (
        <section key={chapter.id} className={`section ${i % 2 === 1 ? 'section--alt' : ''}`}>
          <div className={`container about-chapter ${i % 2 === 1 ? 'about-chapter--reverse' : ''}`}>
            <div className="about-chapter__body">
              <p className="section__eyebrow">{chapter.eyebrow}</p>
              <h2 className="section__title section__title--small">{chapter.title}</h2>
              <p className="about-chapter__text">{chapter.text}</p>
            </div>
            <ImagePlaceholder label={chapter.photo} ratio="4 / 3" className="about-chapter__photo" />
          </div>
        </section>
      ))}

      {/* Video medailonek */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <h2 className="section__title section__title--small">Poslechněte si Lucii Rajskou</h2>
          <p className="section__lead">
            Dvě minuty o tom, proč na klinice věříme přirozenosti víc než trendům.
          </p>
          <VideoPlaceholder label={about.videoLabel} />
        </div>
      </section>

      {/* Milníky */}
      <section className="section">
        <div className="container container--narrow">
          <p className="section__eyebrow">Cesta v datech</p>
          <h2 className="section__title section__title--small">Milníky</h2>
          <ol className="milestones">
            {about.milestones.map((m) => (
              <li key={m.year} className="milestones__item">
                <span className="milestones__year">{m.year}</span>
                <span className="milestones__text">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Citát + CTA */}
      <section className="section section--alt about-quote">
        <div className="container container--narrow">
          <blockquote className="about-quote__quote">
            <p>„{about.quote.text}"</p>
            <cite>— {about.quote.author}</cite>
          </blockquote>
          <div className="about-quote__cta">
            <Link to="/#kontakt" className="btn btn--primary btn--large">
              {site.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
