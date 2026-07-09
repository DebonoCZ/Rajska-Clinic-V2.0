import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from './Placeholders.jsx'

/* Kompaktní CTA box „Dárkový voucher". */
export default function VoucherCta() {
  const { site } = useCms()
  const voucher = site.voucher

  return (
    <section className="section section--voucher">
      <div className="container">
        <div className="voucher">
          <div className="voucher__body">
            <p className="voucher__eyebrow">{voucher.eyebrow}</p>
            <h2 className="voucher__title">{voucher.title}</h2>
            <p className="voucher__text">{voucher.text}</p>
            <Link to="/#kontakt" className="btn btn--primary">
              {voucher.ctaLabel}
            </Link>
          </div>
          <ImagePlaceholder label="FOTO — dárkový voucher" ratio="4 / 3" className="voucher__photo" />
        </div>
      </div>
    </section>
  )
}
