import { splitHighlight } from '../utils/search.js'

export default function Highlight({ text, query }) {
  const parts = splitHighlight(text, query)
  return (
    <>
      {parts.map((p, i) => (p.hit ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
    </>
  )
}
