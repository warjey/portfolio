/**
 * Resolves a path inside /public against Vite's base URL, so the site keeps
 * working if it is ever deployed under a sub-path.
 *   asset('images/profile/photo.jpg') → '/images/profile/photo.jpg'
 * Absolute URLs (https://…) and data URIs are returned unchanged.
 */
export function asset(path) {
  if (!path) return ''
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
