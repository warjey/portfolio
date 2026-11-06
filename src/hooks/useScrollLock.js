import { useEffect } from 'react'

/** Prevents the page behind an overlay (menu, dialog) from scrolling. */
export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined

    const root = document.documentElement
    const scrollbarWidth = window.innerWidth - root.clientWidth
    const previousOverflow = root.style.overflow
    const previousPadding = root.style.paddingRight

    root.style.overflow = 'hidden'
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      root.style.overflow = previousOverflow
      root.style.paddingRight = previousPadding
    }
  }, [active])
}
