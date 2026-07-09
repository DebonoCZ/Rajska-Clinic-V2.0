import { useState } from 'react'
import { useCms } from '../context/CmsContext.jsx'

/* Rezervační formulář — odeslání je v prototypu pouze simulované. */
export default function BookingForm({ preselectedService = '' }) {
  const { services } = useCms()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService,
    message: '',
    gdpr: false,
  })

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="booking-form__success" role="status">
        <span className="booking-form__success-icon" aria-hidden="true">✓</span>
        <h3>Děkujeme, {form.name.split(' ')[0] || 'za zprávu'}!</h3>
        <p>
          Vaši poptávku jsme přijali. Recepce se vám ozve nejpozději následující pracovní den
          a domluví s vámi termín konzultace.
        </p>
        <p className="booking-form__success-note">(V prototypu je odeslání pouze simulované.)</p>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form__row">
        <label>
          Jméno a příjmení *
          <input type="text" required value={form.name} onChange={set('name')} placeholder="Jana Nováková" />
        </label>
        <label>
          Telefon *
          <input type="tel" required value={form.phone} onChange={set('phone')} placeholder="+420 777 123 456" />
        </label>
      </div>
      <div className="booking-form__row">
        <label>
          E-mail *
          <input type="email" required value={form.email} onChange={set('email')} placeholder="jana@email.cz" />
        </label>
        <label>
          Služba
          <select value={form.service} onChange={set('service')}>
            <option value="">— Vyberte službu —</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="jine">Jiné / nevím</option>
          </select>
        </label>
      </div>
      <label>
        Zpráva
        <textarea
          rows={4}
          value={form.message}
          onChange={set('message')}
          placeholder="S čím vám můžeme pomoci? Napište nám, co vás trápí nebo co byste rádi zlepšili."
        />
      </label>
      <label className="booking-form__gdpr">
        <input type="checkbox" required checked={form.gdpr} onChange={set('gdpr')} />
        <span>
          Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky (GDPR). *
        </span>
      </label>
      <button type="submit" className="btn btn--primary btn--large">
        Odeslat poptávku
      </button>
    </form>
  )
}
