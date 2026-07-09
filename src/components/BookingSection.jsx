import BookingForm from './BookingForm.jsx'
import ContactCard from './ContactCard.jsx'

/* Rezervační blok: vylepšený formulář + kontaktní box vedle sebe. */
export default function BookingSection({
  id = 'kontakt',
  eyebrow = 'Uděláme si na vás čas',
  title = 'Domluvte si konzultaci',
  lead = 'Napište nám a recepce se vám ozve nejpozději následující pracovní den s návrhem termínu.',
  preselectedService = '',
}) {
  return (
    <section className="section section--alt booking-section" id={id}>
      <div className="container">
        <p className="section__eyebrow">{eyebrow}</p>
        <h2 className="section__title">{title}</h2>
        <p className="section__lead">{lead}</p>
        <div className="booking-section__grid">
          <BookingForm preselectedService={preselectedService} />
          <ContactCard />
        </div>
      </div>
    </section>
  )
}
