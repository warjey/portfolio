import { site } from '../../data/site'
import { asset } from '../../utils/asset'
import Icon from './Icon'

/**
 * Downloads the resume PDF configured in src/data/site.js.
 * Until a file is configured it renders as an unavailable button rather than
 * a link to a file that doesn't exist.
 */
export default function ResumeButton({ variant = 'secondary', small = false, label = 'Download resume' }) {
  const className = `btn btn--${variant}${small ? ' btn--small' : ''}`
  const { url, downloadName } = site.resume

  if (!url) {
    return (
      <button type="button" className={className} disabled title="Resume will be available soon">
        <Icon name="download" size={16} />
        {small ? 'Resume' : label}
        <span className="visually-hidden"> (coming soon)</span>
      </button>
    )
  }

  return (
    <a className={className} href={asset(url)} download={downloadName} type="application/pdf">
      <Icon name="download" size={16} />
      {small ? 'Resume' : label}
      <span className="visually-hidden"> (PDF)</span>
    </a>
  )
}
