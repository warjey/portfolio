/**
 * Projects.
 *
 * Image `src` paths are relative to /public, without a leading slash.
 * `ratio` should match the screenshot's real width / height so nothing is cropped.
 * Links: leave empty to hide the button.
 */

export const featuredProject = {
  id: 'axioma',
  name: 'Axioma',
  title: 'Axioma — Cross-Platform AI-Powered Research Mapping System',
  tagline: 'Cross-platform, AI-powered research mapping for academic institutions.',
  role: 'Full-Stack Developer / Programmer',
  context: 'Capstone project',
  summary:
    'Axioma helps academic institutions analyze similarities across their research, identify redundant studies, and discover potential research gaps. It applies text processing, machine learning, semantic similarity, and research clustering to turn an institutional research collection into insights.',

  overview: {
    problem:
      'Academic institutions build up large research collections over the years. Without a way to compare that work, it is hard to tell where studies overlap, which topics are already well covered, and where gaps remain.',
    approach:
      'Axioma processes research text and applies machine learning techniques — semantic similarity, clustering, and topic modeling — so an institution can see how its studies relate to one another and where new research is needed.',
    role:
      'Axioma is my capstone project. I worked as the full-stack developer and programmer, building across the cross-platform client, the FastAPI backend, the data layer, and authentication.',
  },

  features: [
    {
      title: 'Cross-platform application',
      description: 'One Flutter and Dart codebase for the web dashboard and the mobile app.',
    },
    {
      title: 'Research similarity analysis',
      description: 'Compares studies by meaning and by wording using text processing and semantic similarity.',
    },
    {
      title: 'AI-powered research mapping',
      description: 'Maps topic saturation across institutions so well-covered areas and open spaces are easy to see.',
    },
    {
      title: 'Clustering & topic modeling',
      description: 'Groups related studies into topic clusters and surfaces trending topics and research gaps.',
    },
    {
      title: 'Redundancy evaluation',
      description: 'Scores a proposed research topic against existing studies and lists the most similar work.',
    },
    {
      title: 'Role-based access control',
      description: 'JWT-secured authentication with permissions based on user roles.',
    },
    {
      title: 'Institutional research management',
      description: 'Document ingestion, browsing, advisers, and topic approvals for an institution’s research.',
    },
  ],

  stack: [
    { layer: 'Client', tech: ['Flutter', 'Dart'], note: 'Cross-platform web and mobile interface' },
    { layer: 'API', tech: ['FastAPI', 'Python', 'REST', 'JWT'], note: 'Endpoints, authentication, role-based access' },
    { layer: 'Intelligence', tech: ['AI', 'NLP'], note: 'Text processing, semantic similarity, clustering, topic modeling' },
    { layer: 'Data', tech: ['MongoDB Atlas'], note: 'Research collection storage' },
    { layer: 'Platform', tech: ['Firebase', 'Cloud deployment'], note: 'Supporting services and hosting' },
  ],

  tech: [
    'Flutter',
    'Dart',
    'FastAPI',
    'Python',
    'MongoDB Atlas',
    'AI & NLP',
    'REST APIs',
    'JWT',
    'Firebase',
    'Cloud deployment',
  ],

  links: {
    github: '',
    live: '',
  },

  media: {
    dashboard: [
      {
        src: 'images/projects/axioma/dashboard-overview.jpg',
        alt: 'Axioma web dashboard showing paper counts, papers by publication year, trending topics, and research gaps',
        caption: 'Dashboard — overview, trending topics, and research gaps',
        ratio: '1919 / 946',
      },
      {
        src: 'images/projects/axioma/dashboard-similarity.jpg',
        alt: 'Axioma redundancy evaluation screen where a proposed research topic is checked for originality',
        caption: 'Redundancy evaluation — originality check for a proposed topic',
        ratio: '1919 / 946',
      },
    ],
    mobile: [
      {
        src: 'images/projects/axioma/mobile-home.jpg',
        alt: 'Axioma mobile dashboard with paper statistics and publication-year chart',
        caption: 'Mobile dashboard',
        ratio: '363 / 857',
      },
      {
        src: 'images/projects/axioma/mobile-research.jpg',
        alt: 'Axioma mobile research browsing screen with search by meaning or keyword',
        caption: 'Research browsing',
        ratio: '375 / 853',
      },
      {
        src: 'images/projects/axioma/mobile-insights.jpg',
        alt: 'Axioma mobile heat map showing topic saturation across institutions',
        caption: 'Topic heat map',
        ratio: '370 / 862',
      },
    ],
  },
}

/**
 * Additional projects use the reusable ProjectCard.
 * Entries with `placeholder: true` render as a quiet "coming soon" card.
 * To publish a real project, replace an entry with: name, role, summary,
 * tech, thumbnail { src, alt }, links { github, live } — and remove `placeholder`.
 */
export const projects = [
  {
    id: 'upcoming-one',
    placeholder: true,
    name: 'Coming soon',
    summary: 'A new project will be featured here.',
  },
  {
    id: 'upcoming-two',
    placeholder: true,
    name: 'Coming soon',
    summary: 'A new project will be featured here.',
  },
]
