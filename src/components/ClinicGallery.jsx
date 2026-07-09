import { useCms } from '../context/CmsContext.jsx'
import { ImagePlaceholder } from './Placeholders.jsx'

/* Galerie prostor kliniky — zobrazuje se na konci každé stránky. */
export default function ClinicGallery() {
  const { site } = useCms()
  const gallery = site.gallery

  return (
    <section className="section clinic-gallery">
      <div className="container">
        <p className="section__eyebrow">{gallery.eyebrow}</p>
        <h2 className="section__title section__title--small">{gallery.title}</h2>
        <div className="clinic-gallery__grid">
          {gallery.photos.map((label, i) => (
            <ImagePlaceholder
              key={label}
              label={label}
              ratio={i === 0 ? '4 / 3' : '1 / 1'}
              className={i === 0 ? 'clinic-gallery__main' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
