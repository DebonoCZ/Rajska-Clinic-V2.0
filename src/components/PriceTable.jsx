import Highlight from './Highlight.jsx'

/* Řádky s balíčky dostávají zlatý štítek, akce/slevy kategorie výrazný promo box. */
const isDeal = (name) => name.toLowerCase().includes('balíček')

export default function PriceTable({ category, query = '' }) {
  return (
    <div className="price-table-wrap">
      {category.description && <p className="price-table__desc">{category.description}</p>}
      <table className="price-table">
        <tbody>
          {category.items.map((item, i) => (
            <tr key={i} className={isDeal(item.name) ? 'price-table__row--deal' : ''}>
              <td className="price-table__name">
                <Highlight text={item.name} query={query} />
                {isDeal(item.name) && <span className="price-table__deal-tag">Výhodný balíček</span>}
                {item.priceNote && <span className="price-table__note"> {item.priceNote}</span>}
              </td>
              <td className="price-table__price">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {category.promo && (
        <aside className="promo-box">
          <span className="promo-box__badge" aria-hidden="true">%</span>
          <div>
            <strong className="promo-box__title">{category.promo.title}</strong>
            <p className="promo-box__text">{category.promo.text}</p>
          </div>
        </aside>
      )}
      {category.note && <p className="price-table__category-note">{category.note}</p>}
    </div>
  )
}
