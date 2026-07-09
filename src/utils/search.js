/* Fulltextové vyhledávání bez ohledu na diakritiku a velikost písmen. */

export function normalize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function matches(haystack, query) {
  const q = normalize(query).trim()
  if (!q) return true
  return normalize(haystack).includes(q)
}

/* Vrátí části textu rozdělené na shody/neshody pro zvýraznění <mark>. */
export function splitHighlight(text, query) {
  const q = normalize(query).trim()
  if (!q || !text) return [{ text, hit: false }]

  const norm = normalize(text)
  const parts = []
  let cursor = 0
  let idx = norm.indexOf(q, cursor)

  while (idx !== -1) {
    if (idx > cursor) parts.push({ text: text.slice(cursor, idx), hit: false })
    parts.push({ text: text.slice(idx, idx + q.length), hit: true })
    cursor = idx + q.length
    idx = norm.indexOf(q, cursor)
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false })
  return parts
}
