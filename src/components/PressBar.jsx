import { useCms } from '../context/CmsContext.jsx'

/* „Můžete nás znát z" — nekonečně rolující pás log (v prototypu textové placeholdery). */
export default function PressBar() {
  const { site } = useCms()
  const logos = site.pressLogos

  return (
    <section className="pressbar" aria-label="Můžete nás znát z">
      <p className="pressbar__heading">Můžete nás znát z</p>
      <div className="pressbar__viewport">
        <div className="pressbar__track">
          {[...logos, ...logos].map((logo, i) => (
            <span className="pressbar__logo" key={i} aria-hidden={i >= logos.length}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
