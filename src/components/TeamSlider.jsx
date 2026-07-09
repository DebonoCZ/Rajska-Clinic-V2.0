import { useEffect, useRef, useState } from 'react'
import DoctorCard from './DoctorCard.jsx'

/* Horizontální slider členů týmu — viditelných ~3,5 karty, posun šipkami i tahem. */
export default function TeamSlider({ doctors }) {
  const viewportRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = viewportRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    const el = viewportRef.current
    el?.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el?.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollByCard = (dir) => {
    const el = viewportRef.current
    if (!el) return
    const card = el.querySelector('.team-slider__item')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth / 3
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="team-slider">
      <div className="team-slider__viewport" ref={viewportRef} tabIndex={0} aria-label="Členové týmu — posouvejte vodorovně">
        {doctors.map((d) => (
          <div className="team-slider__item" key={d.id}>
            <DoctorCard doctor={d} />
          </div>
        ))}
      </div>
      <div className="team-slider__controls">
        <button
          className="team-slider__arrow"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
          aria-label="Předchozí členové týmu"
        >
          ←
        </button>
        <button
          className="team-slider__arrow"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
          aria-label="Další členové týmu"
        >
          →
        </button>
      </div>
    </div>
  )
}
