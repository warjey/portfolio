import Icon from '../ui/Icon'
import ImageSlot from '../ui/ImageSlot'
import ProjectLinks from './ProjectLinks'

export default function FeaturedProject({ project, onOpen }) {
  const [heroScreen] = project.media.dashboard
  const [heroPhone] = project.media.mobile
  const titleId = `${project.id}-title`

  return (
    <article className="featured" aria-labelledby={titleId}>
      <div className="featured__intro">
        <p className="featured__kicker mono-label">
          <span className="featured__kicker-dot" aria-hidden="true" />
          Flagship project
          {project.context && <span className="featured__context">· {project.context}</span>}
        </p>
        <h3 id={titleId} className="featured__name">
          {project.name}
        </h3>
        <p className="featured__tagline">{project.tagline}</p>

        <dl className="featured__meta">
          <div>
            <dt className="mono-label">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="mono-label">Stack</dt>
            <dd>Flutter · FastAPI · MongoDB Atlas</dd>
          </div>
        </dl>

        <p className="featured__summary">{project.summary}</p>

        <div className="featured__actions">
          <button type="button" className="btn btn--primary" onClick={onOpen} aria-haspopup="dialog">
            Read the case study
            <Icon name="arrow-right" size={16} />
          </button>
          <ProjectLinks links={project.links} />
        </div>
      </div>

      <div className="featured__visual">
        <ImageSlot
          variant="screen"
          src={heroScreen.src}
          alt={heroScreen.alt}
          ratio={heroScreen.ratio}
          sizes="(min-width: 1100px) 640px, 92vw"
          className="featured__screen"
        />
        <ImageSlot
          variant="phone"
          src={heroPhone.src}
          alt={heroPhone.alt}
          ratio={heroPhone.ratio}
          sizes="160px"
          className="featured__phone"
        />
      </div>

      <div className="featured__details">
        <h4 className="visually-hidden">Key features</h4>
        <ol className="featured__features">
          {project.features.map((feature, index) => (
            <li key={feature.title} className="featured__feature">
              <span className="featured__feature-index mono-label">{String(index + 1).padStart(2, '0')}</span>
              <h5 className="featured__feature-title">{feature.title}</h5>
              <p className="featured__feature-text">{feature.description}</p>
            </li>
          ))}
          <li className="featured__feature featured__feature--tech">
            <span className="featured__feature-index mono-label">Built with</span>
            <ul className="tag-list" aria-label="Technologies">
              {project.tech.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </div>
    </article>
  )
}
