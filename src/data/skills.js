/**
 * Skill levels — keep these honest. Adjust any `level` below as your
 * experience grows.
 *
 *   applied  → used to build real project work (e.g. Axioma)
 *   academic → used through coursework or formal training
 *   learning → currently studying / early practice
 */
export const skillLevels = [
  { id: 'applied', label: 'Applied in projects' },
  { id: 'academic', label: 'Coursework & training' },
  { id: 'learning', label: 'Currently learning' },
]

export const skillGroups = [
  {
    id: 'languages',
    title: 'Programming languages',
    skills: [
      { name: 'Python', level: 'applied' },
      { name: 'Dart', level: 'applied' },
      { name: 'C#', level: 'academic' },
      { name: 'Java', level: 'academic' },
      { name: 'SQL', level: 'academic' },
      { name: 'JavaScript', level: 'learning' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'Flutter', level: 'applied' },
      { name: 'HTML', level: 'academic' },
      { name: 'CSS', level: 'academic' },
      { name: 'React', level: 'learning' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'FastAPI', level: 'applied' },
      { name: 'RESTful API design', level: 'applied' },
      { name: 'JWT authentication', level: 'applied' },
      { name: 'Role-based access control', level: 'applied' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: [
      { name: 'MongoDB', level: 'applied' },
      { name: 'MySQL', level: 'academic' },
      { name: 'SQL', level: 'academic' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & platforms',
    skills: [
      { name: 'Git & GitHub', level: 'applied' },
      { name: 'Visual Studio Code', level: 'applied' },
      { name: 'Visual Studio', level: 'academic' },
      { name: 'Vercel', level: 'learning' },
      { name: 'Docker', level: 'learning' },
      { name: 'CI/CD deployment', level: 'learning' },
    ],
  },
  {
    id: 'other',
    title: 'Other technical knowledge',
    skills: [
      { name: 'Object-oriented programming', level: 'academic' },
      { name: 'Networking fundamentals', level: 'academic' },
      { name: 'Routing & switching', level: 'academic' },
      { name: 'VLAN configuration', level: 'academic' },
      { name: 'Subnetting', level: 'academic' },
      { name: 'SAP S/4HANA', level: 'academic' },
    ],
  },
]
