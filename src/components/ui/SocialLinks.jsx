import { site } from '../../data/site'
import Icon from './Icon'

const channels = [
  { id: 'github', label: 'GitHub', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
]

/** Lists only the social profiles that have a URL configured in site.js. */
export default function SocialLinks({ className = '', showLabels = true }) {
  const configured = channels.filter((channel) => site.social[channel.id])
  if (configured.length === 0) return null

  return (
    <ul className={className}>
      {configured.map((channel) => (
        <li key={channel.id}>
          <a href={site.social[channel.id]} target="_blank" rel="noopener noreferrer">
            <Icon name={channel.icon} size={18} label={showLabels ? undefined : channel.label} />
            {showLabels && <span>{channel.label}</span>}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
