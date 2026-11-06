import { navigation } from '../../data/navigation'
import { site } from '../../data/site'
import { handleAnchorClick } from '../../utils/scroll'
import Icon from '../ui/Icon'
import SocialLinks from '../ui/SocialLinks'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__identity">
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__title">{site.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="site-footer__nav">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={handleAnchorClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="site-footer__social" showLabels={false} />

        <div className="site-footer__meta">
          <p>
            © {year} {site.name}
          </p>
          <a className="site-footer__top" href="#top" onClick={handleAnchorClick}>
            Back to top
            <Icon name="arrow-up" size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
