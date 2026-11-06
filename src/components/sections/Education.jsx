import { education } from '../../data/education'
import Section from '../ui/Section'
import './Education.css'

export default function Education() {
  return (
    <Section id="education" label="Education" title="Education">
      <ol className="timeline">
        {education.map((entry) => (
          <li key={entry.id} className={`timeline__item${entry.current ? ' is-current' : ''}`}>
            <p className="timeline__period mono-label">
              {entry.period}
              {entry.current && <span className="timeline__status">In progress</span>}
            </p>
            <div className="timeline__body">
              <p className="timeline__level mono-label">{entry.level}</p>
              <h3 className="timeline__program">{entry.program}</h3>
              <p className="timeline__school">{entry.school}</p>
              {entry.note && <p className="timeline__note">{entry.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
