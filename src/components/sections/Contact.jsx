import { site } from '../../data/site'
import Icon from '../ui/Icon'
import ResumeButton from '../ui/ResumeButton'
import Section from '../ui/Section'
import ContactForm from './ContactForm'
import './Contact.css'

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

// Only channels with a value in src/data/site.js are shown.
const channels = [
  site.email && {
    id: 'email',
    label: 'Email',
    icon: 'mail',
    url: `mailto:${site.email}`,
    display: site.email,
  },
  site.social.linkedin && {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    url: site.social.linkedin,
    display: stripProtocol(site.social.linkedin),
    external: true,
  },
  site.social.github && {
    id: 'github',
    label: 'GitHub',
    icon: 'github',
    url: site.social.github,
    display: stripProtocol(site.social.github),
    external: true,
  },
  site.location && {
    id: 'location',
    label: 'Based in',
    icon: 'pin',
    display: site.location,
  },
].filter(Boolean)

export default function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's talk."
      intro="I'm open to internship opportunities, collaborative projects, and conversations about software engineering."
    >
      <div className="contact">
        <div className="contact__aside">
          <ul className="contact__channels">
            {channels.map((channel) => (
              <li key={channel.id}>
                {channel.url ? (
                  <a
                    className="contact__channel"
                    href={channel.url}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon name={channel.icon} size={18} />
                    <span className="contact__channel-text">
                      <span className="mono-label">{channel.label}</span>
                      <span className="contact__channel-value">{channel.display}</span>
                    </span>
                    <Icon name="arrow-up-right" size={16} className="contact__channel-arrow" />
                    {channel.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <div className="contact__channel">
                    <Icon name={channel.icon} size={18} />
                    <span className="contact__channel-text">
                      <span className="mono-label">{channel.label}</span>
                      <span className="contact__channel-value">{channel.display}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="contact__resume">
            <ResumeButton />
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
