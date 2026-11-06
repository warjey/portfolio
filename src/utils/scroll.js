function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Scrolls to a section and moves keyboard focus to it, so screen-reader and
 * keyboard users land in the same place as everyone else.
 */
export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  target.focus({ preventScroll: true })

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`)
  }
}

/** Click handler for in-page links: `<a href="#about" onClick={handleAnchorClick}>`. */
export function handleAnchorClick(event) {
  const href = event.currentTarget.getAttribute('href') ?? ''
  if (!href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey) return

  const id = href.slice(1)
  if (!document.getElementById(id)) return

  event.preventDefault()
  scrollToSection(id)
}
