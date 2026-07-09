import { useMemo, useState } from 'react'
import { useCms } from '../context/CmsContext.jsx'
import Accordion from '../components/Accordion.jsx'
import StickyCta from '../components/StickyCta.jsx'
import { matches } from '../utils/search.js'

/* Klíčová stránka prototypu (bod C nabídky): akordeon + fulltext + rychlá navigace. */
export default function PricelistPage() {
  const { pricelist } = useCms()
  const [query, setQuery] = useState('')
  const [openIds, setOpenIds] = useState([])
  const [activeSection, setActiveSection] = useState('all')

  const sections = pricelist.sections

  /* Kategorie viditelné podle přepínače sekce (Estetická medicína / Dermatologie). */
  const sectionCategories = useMemo(() => {
    if (activeSection === 'all') return pricelist.categories
    const section = sections.find((s) => s.id === activeSection)
    return pricelist.categories.filter((c) => section?.categoryIds.includes(c.id))
  }, [pricelist, sections, activeSection])

  /* Fulltext: kategorie zůstává, pokud odpovídá její název, klíčová slova (synonyma
     typu „botox") nebo kterákoli položka. */
  const visibleCategories = useMemo(() => {
    if (!query.trim()) return sectionCategories
    return sectionCategories.filter(
      (c) =>
        matches(c.name, query) ||
        (c.keywords || []).some((k) => matches(k, query)) ||
        c.items.some((item) => matches(item.name, query))
    )
  }, [sectionCategories, query])

  /* Při vyhledávání se relevantní kategorie samy rozbalí. */
  const searching = Boolean(query.trim())
  const effectiveOpenIds = searching ? visibleCategories.map((c) => c.id) : openIds

  const toggle = (id) => {
    if (searching) return
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const jumpToCategory = (id) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    requestAnimationFrame(() => {
      document.getElementById(`kategorie-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const totalItems = pricelist.categories.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section__eyebrow">Přehledně a na jednom místě</p>
          <h1 className="section__title">Ceník</h1>
          <p className="section__lead">
            {pricelist.categories.length} kategorií, {totalItems} položek. Hledejte, listujte,
            rozklikávejte — vše se edituje na jednom místě.
          </p>
        </div>
      </section>

      <section className="section section--pricelist">
        <div className="container container--narrow">
          {/* Fulltextové vyhledávání */}
          <div className="pricelist__search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat v ceníku… (např. „botox“, „laser“, „rty“)"
              aria-label="Hledat v ceníku"
            />
            {searching && (
              <button className="pricelist__search-clear" onClick={() => setQuery('')}>
                Zrušit
              </button>
            )}
          </div>

          {/* Přepínač sekcí */}
          <div className="pricelist__sections" role="tablist" aria-label="Oblast péče">
            <button
              role="tab"
              aria-selected={activeSection === 'all'}
              className={activeSection === 'all' ? 'is-active' : ''}
              onClick={() => setActiveSection('all')}
            >
              Vše
            </button>
            {sections.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={activeSection === s.id}
                className={activeSection === s.id ? 'is-active' : ''}
                onClick={() => setActiveSection(s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Rychlá navigace na kategorie */}
          {!searching && (
            <div className="pricelist__chips" aria-label="Rychlá navigace">
              {sectionCategories.map((c) => (
                <button key={c.id} className="chip" onClick={() => jumpToCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {searching && (
            <p className="pricelist__results" role="status">
              {visibleCategories.length === 0
                ? 'Nic jsme nenašli — zkuste jiný výraz.'
                : `Nalezeno v ${visibleCategories.length} ${
                    visibleCategories.length === 1
                      ? 'kategorii'
                      : visibleCategories.length < 5
                        ? 'kategoriích'
                        : 'kategoriích'
                  }.`}
            </p>
          )}

          <Accordion
            categories={visibleCategories}
            openIds={effectiveOpenIds}
            onToggle={toggle}
            query={query}
          />
        </div>
      </section>

      <StickyCta />
    </>
  )
}
