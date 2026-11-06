// Order here controls the navigation bar and the section numbering.
export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'training', label: 'Training' },
  { id: 'contact', label: 'Contact' },
]

export function sectionNumber(id) {
  const index = navigation.findIndex((item) => item.id === id)
  return String(index + 1).padStart(2, '0')
}
