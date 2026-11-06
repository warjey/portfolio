import { useState } from 'react'
import { skillGroups, skillLevels } from '../../data/skills'
import Section from '../ui/Section'
import './Skills.css'

const levelLabel = Object.fromEntries(skillLevels.map((level) => [level.id, level.label]))

export default function Skills() {
  const [focusLevel, setFocusLevel] = useState('all')

  return (
    <Section
      id="skills"
      label="Skills"
      title="Technical skills"
      intro="Grouped by area and marked by how I've used them — so it's clear what I've built with and what I'm still learning."
    >
      <div className="skills">
        <div className="skills__legend" role="group" aria-label="Highlight skills by experience level">
          <button
            type="button"
            className="skills__filter"
            aria-pressed={focusLevel === 'all'}
            onClick={() => setFocusLevel('all')}
          >
            All
          </button>
          {skillLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              className="skills__filter"
              aria-pressed={focusLevel === level.id}
              onClick={() => setFocusLevel(level.id)}
            >
              <span className={`skill-marker skill-marker--${level.id}`} aria-hidden="true" />
              {level.label}
            </button>
          ))}
        </div>

        <div className="skills__groups" data-focus={focusLevel}>
          {skillGroups.map((group) => (
            <div key={group.id} className="skill-group">
              <h3 className="skill-group__title">{group.title}</h3>
              <ul className="skill-group__list">
                {group.skills.map((skill) => {
                  const dimmed = focusLevel !== 'all' && focusLevel !== skill.level
                  return (
                    <li key={skill.name} className={`skill${dimmed ? ' is-dimmed' : ''}`}>
                      <span className={`skill-marker skill-marker--${skill.level}`} aria-hidden="true" />
                      <span className="skill__name">{skill.name}</span>
                      <span className="visually-hidden"> — {levelLabel[skill.level]}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
