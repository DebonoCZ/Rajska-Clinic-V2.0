import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'

/* Plovoucí CTA lišta — na ceníku drží akci „Domluvit konzultaci" stále na očích. */
export default function StickyCta({ to = '/#kontakt', label }) {
  const { site } = useCms()
  return (
    <div className="sticky-cta">
      <Link to={to} className="btn btn--primary btn--large">
        {label || site.ctaLabel}
      </Link>
    </div>
  )
}
