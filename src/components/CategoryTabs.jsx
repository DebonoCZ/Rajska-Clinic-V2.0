/* Přepínač kategorií služeb (tabs) — sdílený pro homepage i /sluzby. */
export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Kategorie služeb">
      {categories.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={active === cat ? 'is-active' : ''}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
