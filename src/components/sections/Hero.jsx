import { hero } from '../../data/profile'
import { site } from '../../data/site'
import { handleAnchorClick } from '../../utils/scroll'
import Icon from '../ui/Icon'
import ImageSlot from '../ui/ImageSlot'
import ResumeButton from '../ui/ResumeButton'
import SocialLinks from '../ui/SocialLinks'
import './Hero.css'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow mono-label">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__name">
            {site.name}
          </h1>
          <p className="hero__role">{hero.role}</p>
          <p className="hero__lead">{hero.lead}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects" onClick={handleAnchorClick}>
              View Axioma
              <Icon name="arrow-right" size={16} />
            </a>
            <ResumeButton />
            <a className="btn btn--quiet" href="#contact" onClick={handleAnchorClick}>
              Get in touch
            </a>
          </div>

          <SocialLinks className="hero__social" />
        </div>

        <figure className="hero__portrait">
          <ImageSlot
            variant="portrait"
            src={hero.photo.src}
            alt={hero.photo.alt}
            sizes="(min-width: 960px) 360px, 70vw"
            priority
          />
          <figcaption className="hero__caption mono-label">
            <span>RJ Salundaga</span>
            <span>BSIT · STI SJDM</span>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className="hero__facts">
          {hero.facts.map((fact) => (
            <div key={fact.label} className="hero__fact">
              <dt className="mono-label">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
