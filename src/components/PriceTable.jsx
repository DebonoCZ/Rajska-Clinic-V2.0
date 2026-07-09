import Highlight from './Highlight.jsx'

export default function PriceTable({ category, query = '' }) {
  return (
    <div className="price-table-wrap">
      {category.description && <p className="price-table__desc">{category.description}</p>}
      <table className="price-table">
        <tbody>
          {category.items.map((item, i) => (
            <tr key={i}>
              <td className="price-table__name">
                <Highlight text={item.name} query={query} />
                {item.priceNote && <span className="price-table__note"> {item.priceNote}</span>}
              </td>
              <td className="price-table__price">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {category.note && <p className="price-table__category-note">{category.note}</p>}
    </div>
  )
}
