export const slugifyCity = (city) => {
  if (!city) return ''
  return city
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const deslugifyCity = (slug) => {
  if (!slug) return ''
  try {
    return decodeURIComponent(slug).replace(/-/g, ' ').trim()
  } catch {
    return slug.replace(/-/g, ' ').trim()
  }
}

export const isValidCityName = (name) => {
  const trimmed = name?.trim() ?? ''
  return trimmed.length >= 2 && trimmed.length <= 100
}
