import { useCms } from '../context/CmsContext.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import BookingSection from '../components/BookingSection.jsx'

/* Samostatná stránka týmu — plná mřížka karet (bez slideru). */
export default function TeamPage() {
  const { doctors } = useCms()

  const medici = doctors.filter((d) => d.serviceSlugs.length > 0 || d.name.startsWith('MUDr.'))
  const zazemi = doctors.filter((d) => !medici.includes(d))

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section__eyebrow">Kdo se o vás postará</p>
          <h1 className="section__title">Náš sehraný tým</h1>
          <p className="section__lead">
            Lékaři s dlouholetou praxí v dermatologii, estetické medicíně i plastické chirurgii —
            a zázemí, které dohlédne na to, abyste se u nás cítili dobře.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <h2 className="section__title section__title--small">Lékaři</h2>
          <div className="grid grid--doctors">
            {medici.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        </div>
      </section>

      {zazemi.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title section__title--small">Zázemí kliniky</h2>
            <div className="grid grid--doctors">
              {zazemi.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingSection id="kontakt-tym" />
    </>
  )
}
