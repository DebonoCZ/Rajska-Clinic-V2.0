import Highlight from './Highlight.jsx'
import PriceTable from './PriceTable.jsx'

/* Rozklikávací akordeon kategorií ceníku s plynulou animací. */
export function AccordionItem({ category, isOpen, onToggle, query = '' }) {
  return (
    <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} id={`kategorie-${category.id}`}>
      <button
        className="accordion__header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${category.id}`}
      >
        <span className="accordion__title">
          <Highlight text={category.name} query={query} />
        </span>
        <span className="accordion__meta">
          <span className="accordion__count">
            {category.items.length}{' '}
            {category.items.length === 1 ? 'položka' : category.items.length < 5 ? 'položky' : 'položek'}
          </span>
          <span className="accordion__chevron" aria-hidden="true" />
        </span>
      </button>
      <div className="accordion__panel" id={`panel-${category.id}`} role="region">
        <div className="accordion__panel-inner">
          <PriceTable category={category} query={query} />
        </div>
      </div>
    </div>
  )
}

export default function Accordion({ categories, openIds, onToggle, query = '' }) {
  if (!categories.length) {
    return <p className="accordion__empty">Hledanému výrazu neodpovídá žádná položka ceníku.</p>
  }
  return (
    <div className="accordion">
      {categories.map((cat) => (
        <AccordionItem
          key={cat.id}
          category={cat}
          isOpen={openIds.includes(cat.id)}
          onToggle={() => onToggle(cat.id)}
          query={query}
        />
      ))}
    </div>
  )
}
