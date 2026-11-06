import { sectionNumber } from '../../data/navigation'
import './Section.css'

/**
 * Shared section shell.
 *   layout="split" → label in a narrow left column, content on the right
 *   layout="wide"  → label and heading above full-width content
 */
export default function Section({ id, label, title, intro, layout = 'split', className = '', children }) {
  const titleId = `${id}-title`

  return (
    <section
      id={id}
      className={`section section--${layout} ${className}`.trim()}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="container section__inner">
        <p className="section__label mono-label">
          <span className="section__number">{sectionNumber(id)}</span>
          <span className="section__label-text">{label}</span>
        </p>

        <div className="section__content">
          <header className="section__header">
            <h2 id={titleId} className="section__title">
              {title}
            </h2>
            {intro && <p className="section__intro">{intro}</p>}
          </header>
          {children}
        </div>
      </div>
    </section>
  )
}
