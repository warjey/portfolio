import { useMemo, useState } from 'react'
import { achievementCategories, achievements } from '../../data/achievements'
import Section from '../ui/Section'
import './Achievements.css'

const byRecent = (a, b) => b.sortYear - a.sortYear
const highlights = achievements.filter((item) => item.highlight).sort(byRecent)
const record = achievements.filter((item) => !item.highlight).sort(byRecent)
const categoryLabel = Object.fromEntries(achievementCategories.map((category) => [category.id, category.label]))

const filters = [
  { id: 'all', label: 'All', count: record.length },
  ...achievementCategories.map((category) => ({
    ...category,
    count: record.filter((item) => item.category === category.id).length,
  })),
].filter((filter) => filter.count > 0)

export default function Achievements() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleRecord = useMemo(
    () => (activeFilter === 'all' ? record : record.filter((item) => item.category === activeFilter)),
    [activeFilter],
  )

  return (
    <Section id="achievements" label="Achievements" title="Achievements & awards">
      <ul className="highlights">
        {highlights.map((item) => (
          <li key={item.id} className="highlight">
            <p className="highlight__year">{item.year}</p>
            <h3 className="highlight__title">{item.title}</h3>
            <p className="highlight__detail">{item.detail}</p>
          </li>
        ))}
      </ul>

      <div className="record">
        <div className="record__toolbar">
          <h3 className="record__title">Full record</h3>
          <div className="record__filters" role="group" aria-label="Filter achievements by category">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className="record__filter"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
                <span className="record__count">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="visually-hidden" role="status">
          Showing {visibleRecord.length} {activeFilter === 'all' ? '' : categoryLabel[activeFilter]} achievements
        </p>
        <ul className="record__list">
          {visibleRecord.map((item) => (
            <li key={item.id} className="record__row">
              <span className="record__year mono-label">{item.year}</span>
              <span className="record__text">
                <span className="record__name">{item.title}</span>
                <span className="record__detail">{item.detail}</span>
              </span>
              <span className="record__category mono-label">{categoryLabel[item.category]}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
