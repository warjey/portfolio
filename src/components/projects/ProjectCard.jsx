import Icon from '../ui/Icon'
import ImageSlot from '../ui/ImageSlot'
import ProjectLinks from './ProjectLinks'

/** Reusable card for additional projects. Driven entirely by src/data/projects.js. */
export default function ProjectCard({ project, onOpen }) {
  const hasDetail = !project.placeholder && Boolean(project.overview || project.features)
  const titleId = `${project.id}-title`
  const tech = project.tech ?? []

  return (
    <article className={`project-card${project.placeholder ? ' project-card--placeholder' : ''}`} aria-labelledby={titleId}>
      <ImageSlot
        variant="thumbnail"
        src={project.thumbnail?.src}
        alt={project.thumbnail?.alt}
        ratio={project.thumbnail?.ratio}
        sizes="(min-width: 900px) 560px, 92vw"
      />

      <div className="project-card__body">
        <h4 id={titleId} className="project-card__name">
          {project.name}
        </h4>
        {project.role && <p className="project-card__role mono-label">{project.role}</p>}
        {project.summary && <p className="project-card__summary">{project.summary}</p>}

        {tech.length > 0 && (
          <ul className="tag-list" aria-label="Technologies">
            {tech.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        )}

        {(hasDetail || project.links) && (
          <div className="project-card__actions">
            {hasDetail && (
              <button type="button" className="btn btn--secondary btn--small" onClick={onOpen} aria-haspopup="dialog">
                Details
                <Icon name="arrow-right" size={14} />
              </button>
            )}
            <ProjectLinks links={project.links} small />
          </div>
        )}
      </div>
    </article>
  )
}
