import { Link } from 'react-router-dom'
import { ImagePlaceholder } from './Placeholders.jsx'

export default function DoctorCard({ doctor }) {
  return (
    <Link to={`/tym/${doctor.slug}`} className="doctor-card">
      <ImagePlaceholder label={doctor.photo} ratio="4 / 5" className="doctor-card__photo" />
      <div className="doctor-card__body">
        <p className="doctor-card__name">{doctor.name}</p>
        <p className="doctor-card__title">{doctor.title}</p>
        <span className="doctor-card__more">Zobrazit profil →</span>
      </div>
    </Link>
  )
}
