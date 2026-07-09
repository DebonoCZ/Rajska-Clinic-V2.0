import { useState } from 'react'
import { useCms } from '../context/CmsContext.jsx'

/*
 * Demo režim „Jak funguje CMS": úprava obsahu na jednom místě
 * se okamžitě projeví na všech stránkách, které z dat čtou —
 * přesně jako v budoucí Webflow CMS kolekci.
 */
export default function CmsDemoPanel() {
  const { pricelist, doctors, updateItemPrice, updateDoctorName } = useCms()
  const [open, setOpen] = useState(false)

  const [categoryId, setCategoryId] = useState(pricelist.categories[0]?.id ?? '')
  const category = pricelist.categories.find((c) => c.id === categoryId) ?? pricelist.categories[0]
  const [itemIndex, setItemIndex] = useState(0)
  const safeItemIndex = Math.min(itemIndex, (category?.items.length ?? 1) - 1)

  const [doctorId, setDoctorId] = useState(doctors[0]?.id ?? '')
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0]

  return (
    <>
      <button className="cms-demo__fab" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        🔧 Demo CMS
      </button>

      {open && (
        <aside className="cms-demo__panel" aria-label="Demo CMS panel">
          <div className="cms-demo__head">
            <strong>Jak funguje CMS</strong>
            <button className="cms-demo__close" onClick={() => setOpen(false)} aria-label="Zavřít panel">
              ×
            </button>
          </div>
          <p className="cms-demo__intro">
            Upravte hodnotu a sledujte, jak se změní <em>všude najednou</em> — na ceníku,
            na podstránce služby i na kartě lékaře. Přesně takto bude fungovat editace ve Webflow CMS.
          </p>

          <section className="cms-demo__section">
            <h4>Cena položky ceníku</h4>
            <label>
              Kategorie
              <select
                value={category?.id}
                onChange={(e) => {
                  setCategoryId(e.target.value)
                  setItemIndex(0)
                }}
              >
                {pricelist.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Položka
              <select value={safeItemIndex} onChange={(e) => setItemIndex(Number(e.target.value))}>
                {category?.items.map((item, i) => (
                  <option key={i} value={i}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cena
              <input
                type="text"
                value={category?.items[safeItemIndex]?.price ?? ''}
                onChange={(e) => updateItemPrice(category.id, safeItemIndex, e.target.value)}
              />
            </label>
          </section>

          <section className="cms-demo__section">
            <h4>Jméno lékaře</h4>
            <label>
              Člen týmu
              <select value={doctor?.id} onChange={(e) => setDoctorId(e.target.value)}>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Jméno
              <input
                type="text"
                value={doctor?.name ?? ''}
                onChange={(e) => updateDoctorName(doctor.id, e.target.value)}
              />
            </label>
          </section>

          <p className="cms-demo__note">
            Změny žijí jen ve vašem prohlížeči — po obnovení stránky se vrátí původní data.
          </p>
        </aside>
      )}
    </>
  )
}
