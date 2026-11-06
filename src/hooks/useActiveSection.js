import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the middle band of the
 * viewport. `ids` must be a stable array (define it outside the component).
 */
export default function useActiveSection(ids) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
