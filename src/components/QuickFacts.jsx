/* Pás rychlých faktů o ošetření — délka, anestezie, rekonvalescence, výdrž výsledku. */
export default function QuickFacts({ facts }) {
  const items = [
    { label: 'Délka ošetření', value: facts.duration },
    { label: 'Anestezie', value: facts.anesthesia },
    { label: 'Rekonvalescence', value: facts.recovery },
    { label: 'Výsledek', value: facts.result },
  ]
  return (
    <dl className="quick-facts">
      {items.map((item) => (
        <div className="quick-facts__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
