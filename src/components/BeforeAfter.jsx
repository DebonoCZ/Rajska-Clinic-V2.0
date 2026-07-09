import { useState } from 'react'
import { ImagePlaceholder } from './Placeholders.jsx'

/* Galerie „před / po" — placeholder dvojice s přepínačem. */
function BeforeAfterPair({ index, serviceName }) {
  const [showAfter, setShowAfter] = useState(false)
  return (
    <figure className="before-after__pair">
      <ImagePlaceholder
        label={`FOTO — ${showAfter ? 'po' : 'před'} ošetřením ${index + 1} (${serviceName})`}
        ratio="4 / 5"
      />
      <div className="before-after__switch" role="group" aria-label={`Před / po — ukázka ${index + 1}`}>
        <button className={!showAfter ? 'is-active' : ''} onClick={() => setShowAfter(false)}>
          Před
        </button>
        <button className={showAfter ? 'is-active' : ''} onClick={() => setShowAfter(true)}>
          Po
        </button>
      </div>
    </figure>
  )
}

export default function BeforeAfter({ count, serviceName }) {
  return (
    <div className="before-after">
      {Array.from({ length: count }, (_, i) => (
        <BeforeAfterPair key={i} index={i} serviceName={serviceName} />
      ))}
    </div>
  )
}
