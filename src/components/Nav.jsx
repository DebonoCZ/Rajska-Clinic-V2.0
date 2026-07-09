import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'

export default function Nav() {
  const { site } = useCms()
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          {site.clinicName}
        </Link>

        <nav className={`nav__menu ${open ? 'is-open' : ''}`} aria-label="Hlavní navigace">
          {site.nav.map((item) => (
            <Link key={item.path} to={item.path} className="nav__link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/#kontakt" className="btn btn--primary nav__cta" onClick={() => setOpen(false)}>
            {site.ctaLabel}
          </Link>
        </nav>

        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
