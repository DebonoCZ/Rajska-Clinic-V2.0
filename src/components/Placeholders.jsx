/* Šedé placeholder bloky za fotografie a videa — do produkce se nahradí reálnými médii. */

export function ImagePlaceholder({ label, ratio = '4 / 5', className = '' }) {
  return (
    <div className={`placeholder placeholder--image ${className}`} style={{ aspectRatio: ratio }}>
      <span className="placeholder__icon" aria-hidden="true">🖼</span>
      <span className="placeholder__label">{label}</span>
    </div>
  )
}

export function VideoPlaceholder({ label, ratio = '16 / 9', className = '' }) {
  return (
    <div className={`placeholder placeholder--video ${className}`} style={{ aspectRatio: ratio }}>
      <span className="placeholder__play" aria-hidden="true">▶</span>
      <span className="placeholder__label">{label}</span>
    </div>
  )
}
