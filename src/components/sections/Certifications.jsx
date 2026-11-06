import { certifications } from '../../data/certifications'
import Section from '../ui/Section'
import './Certifications.css'

export default function Certifications() {
  return (
    <Section id="training" label="Training" title="Training & certifications">
      <ul className="certs">
        {certifications.map((cert) => (
          <li key={cert.id} className="cert">
            <p className="cert__meta mono-label">
              <span className="cert__year">{cert.year}</span>
              <span className="cert__issuer">{cert.provider}</span>
            </p>
            <div className="cert__body">
              <h3 className="cert__title">{cert.title}</h3>
              <ul className="cert__points">
                {cert.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
