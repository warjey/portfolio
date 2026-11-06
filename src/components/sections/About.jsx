import { about } from '../../data/profile'
import Section from '../ui/Section'
import './About.css'

export default function About() {
  return (
    <Section id="about" label="About" title="Building software from the database up.">
      <div className="about">
        <div className="about__prose">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <dl className="about__details">
          {about.details.map((detail) => (
            <div key={detail.label} className="about__detail">
              <dt className="mono-label">{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
