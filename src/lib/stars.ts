// Letterboxd ratings are 0.5–5 in half steps: 3.5 → ★★★½
export function stars(rating: number | null) {
  if (rating == null) return ''
  return '★'.repeat(Math.floor(rating)) + (rating % 1 ? '½' : '')
}
