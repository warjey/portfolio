import ImageSlot from '../ui/ImageSlot'
import ProjectLinks from './ProjectLinks'

/**
 * Long-form case study shown inside the project dialog. Every block is
 * optional, so lighter projects can reuse it with fewer fields.
 */
export default function ProjectDetail({ project, titleId }) {
  const { overview, features, stack, media = {} } = project
  const screens = media.dashboard ?? []
  const phones = media.mobile ?? []
  const leadImage = screens[0] ?? project.thumbnail

  return (
    <article className="case-study">
      <header className="case-study__header">
        <p className="mono-label">Case study{project.context ? ` · ${project.context}` : ''}</p>
        <h2 id={titleId} className="case-study__title">
          {project.title ?? project.name}
        </h2>
        {project.tagline && <p className="case-study__tagline">{project.tagline}</p>}
        {project.role && (
          <dl className="case-study__meta">
            <div>
              <dt className="mono-label">Role</dt>
              <dd>{project.role}</dd>
            </div>
          </dl>
        )}
        <ProjectLinks links={project.links} small />
      </header>

      {leadImage?.src && (
        <figure className="case-study__figure case-study__lead">
          <ImageSlot
            variant={screens.length ? 'screen' : 'thumbnail'}
            src={leadImage.src}
            alt={leadImage.alt}
            ratio={leadImage.ratio}
            sizes="(min-width: 1024px) 900px, 94vw"
          />
          {leadImage.caption && <figcaption>{leadImage.caption}</figcaption>}
        </figure>
      )}

      {overview ? (
        <section className="case-study__block" aria-labelledby={`${project.id}-overview`}>
          <h3 id={`${project.id}-overview`} className="case-study__heading">
            Overview
          </h3>
          <div className="case-study__overview">
            {[
              ['The problem', overview.problem],
              ['The approach', overview.approach],
              ['My role', overview.role],
            ]
              .filter(([, text]) => text)
              .map(([label, text]) => (
                <div key={label}>
                  <h4 className="mono-label">{label}</h4>
                  <p>{text}</p>
                </div>
              ))}
          </div>
        </section>
      ) : (
        project.summary && <p className="case-study__summary">{project.summary}</p>
      )}

      {features?.length > 0 && (
        <section className="case-study__block" aria-labelledby={`${project.id}-features`}>
          <h3 id={`${project.id}-features`} className="case-study__heading">
            Key features
          </h3>
          <ul className="case-study__features">
            {features.map((feature) => (
              <li key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {stack?.length > 0 && (
        <section className="case-study__block" aria-labelledby={`${project.id}-architecture`}>
          <h3 id={`${project.id}-architecture`} className="case-study__heading">
            Architecture
          </h3>
          <table className="case-study__stack">
            <caption className="visually-hidden">System layers and technologies</caption>
            <thead>
              <tr>
                <th scope="col">Layer</th>
                <th scope="col">Technology</th>
                <th scope="col">Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((row) => (
                <tr key={row.layer}>
                  <th scope="row">{row.layer}</th>
                  <td>{row.tech.join(', ')}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {(screens.length > 1 || phones.length > 0) && (
        <section className="case-study__block" aria-labelledby={`${project.id}-gallery`}>
          <h3 id={`${project.id}-gallery`} className="case-study__heading">
            Screens
          </h3>
          {screens.slice(1).map((shot) => (
            <figure key={shot.src} className="case-study__figure case-study__screen">
              <ImageSlot
                variant="screen"
                src={shot.src}
                alt={shot.alt}
                ratio={shot.ratio}
                sizes="(min-width: 1024px) 900px, 94vw"
              />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
          {phones.length > 0 && (
            <div className="case-study__phones">
              {phones.map((shot) => (
                <figure key={shot.src} className="case-study__figure">
                  <ImageSlot
                    variant="phone"
                    src={shot.src}
                    alt={shot.alt}
                    ratio={shot.ratio}
                    sizes="(min-width: 1024px) 260px, 30vw"
                  />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {project.tech?.length > 0 && (
        <section className="case-study__block" aria-labelledby={`${project.id}-tech`}>
          <h3 id={`${project.id}-tech`} className="case-study__heading">
            Technologies
          </h3>
          <ul className="tag-list">
            {project.tech.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
