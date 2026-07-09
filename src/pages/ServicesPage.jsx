import { useState } from 'react'
import { useCms } from '../context/CmsContext.jsx'
import CategoryTabs from '../components/CategoryTabs.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import DoctorHelpCta from '../components/DoctorHelpCta.jsx'
import VoucherCta from '../components/VoucherCta.jsx'

/* Rozcestník služeb: jedna úroveň — taby podle oblasti, karty, detail.
   Žádné mezistránky; karta říká, co ošetření řeší. */
export default function ServicesPage() {
  const { services } = useCms()
  const [tab, setTab] = useState('Vše')

  const categories = ['Vše', 'Estetická medicína', 'Dermatologie', 'Plastická chirurgie']
  const visible = tab === 'Vše' ? services : services.filter((s) => s.category === tab)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section__eyebrow">Naše péče</p>
          <h1 className="section__title">Služby</h1>
          <p className="section__lead">
            Vyberte si podle toho, co vás trápí — každá karta říká, s čím ošetření pomáhá.
            Detail pak ukáže průběh, ceny i lékaře, kteří se vám budou věnovat.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0.5rem' }}>
        <div className="container">
          <CategoryTabs categories={categories} active={tab} onChange={setTab} />
          <div className="grid grid--services">
            {visible.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Pomoc s výběrem */}
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
    </>
  )
}
