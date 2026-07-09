import { Link } from 'react-router-dom'
import { ImagePlaceholder } from './Placeholders.jsx'

export default function ServiceCard({ service }) {
  return (
    <Link to={`/sluzby/${service.slug}`} className="service-card">
      <ImagePlaceholder label={`FOTO — ${service.name}`} ratio="3 / 2" className="service-card__photo" />
      <div className="service-card__body">
        <p className="service-card__category">{service.category}</p>
        <h3 className="service-card__name">{service.name}</h3>
        <p className="service-card__claim">{service.heroClaim}</p>
        <span className="service-card__more">Více o službě →</span>
      </div>
    </Link>
  )
}
