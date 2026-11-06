import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../data/navigation'
import { site } from '../../data/site'
import useActiveSection from '../../hooks/useActiveSection'
import useScrolled from '../../hooks/useScrolled'
import useScrollLock from '../../hooks/useScrollLock'
import { handleAnchorClick, scrollToSection } from '../../utils/scroll'
import Icon from '../ui/Icon'
import ResumeButton from '../ui/ResumeButton'
import './Header.css'

const TRACKED_SECTIONS = ['top', ...navigation.map((item) => item.id)]
const DESKTOP_QUERY = '(min-width: 900px)'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const scrolled = useScrolled(8)
  const activeId = useActiveSection(TRACKED_SECTIONS)

  useScrollLock(menuOpen)

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const handleViewportChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleViewportChange)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleViewportChange)
    }
  }, [menuOpen])

  const handleNavigate = (event) => {
    if (!menuOpen) {
      handleAnchorClick(event)
      return
    }
    // Close the menu first so the scroll lock is released before scrolling.
    const id = event.currentTarget.getAttribute('href').slice(1)
    event.preventDefault()
    setMenuOpen(false)
    window.requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <header className={`site-header${scrolled || menuOpen ? ' is-solid' : ''}`}>
      <div className="container site-header__bar">
        <a className="site-header__brand" href="#top" onClick={handleNavigate}>
          <span className="site-header__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="site-header__name">{site.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="site-nav__link"
                  aria-current={activeId === item.id ? 'location' : undefined}
                  onClick={handleNavigate}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <ResumeButton small />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} inert={!menuOpen}>
        <nav className="container" aria-label="Mobile">
          <ul className="mobile-menu__list">
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="mobile-menu__link"
                  aria-current={activeId === item.id ? 'location' : undefined}
                  onClick={handleNavigate}
                >
                  <span className="mobile-menu__index">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__footer">
            <ResumeButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
