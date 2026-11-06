import Icon from '../ui/Icon'

/** GitHub / live demo links. Links without a URL are not rendered. */
export default function ProjectLinks({ links = {}, small = false }) {
  const items = [
    { id: 'github', label: 'Source code', icon: 'github', url: links.github },
    { id: 'live', label: 'Live demo', icon: 'arrow-up-right', url: links.live },
  ].filter((item) => item.url)

  if (items.length === 0) return null

  return (
    <ul className="project-links">
      {items.map((item) => (
        <li key={item.id}>
          <a
            className={`btn btn--secondary${small ? ' btn--small' : ''}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name={item.icon} size={16} />
            {item.label}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
