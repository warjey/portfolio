import { useState } from 'react'
import { featuredProject, projects } from '../../data/projects'
import FeaturedProject from '../projects/FeaturedProject'
import ProjectCard from '../projects/ProjectCard'
import ProjectDetail from '../projects/ProjectDetail'
import Modal from '../ui/Modal'
import Section from '../ui/Section'
import './Projects.css'

const allProjects = [featuredProject, ...projects]
const DETAIL_TITLE_ID = 'project-detail-title'

export default function Projects() {
  const [openProjectId, setOpenProjectId] = useState(null)
  const openProject = allProjects.find((project) => project.id === openProjectId)

  return (
    <Section
      id="projects"
      layout="wide"
      label="Projects"
      title="Featured work"
      intro="Axioma is my capstone and main full-stack project — an end-to-end system covering a cross-platform client, an API, machine learning, and data storage."
    >
      <FeaturedProject project={featuredProject} onOpen={() => setOpenProjectId(featuredProject.id)} />

      {projects.length > 0 && (
        <div className="more-projects">
          <h3 className="more-projects__title">More projects</h3>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setOpenProjectId(project.id)} />
            ))}
          </div>
        </div>
      )}

      <Modal open={Boolean(openProject)} onClose={() => setOpenProjectId(null)} titleId={DETAIL_TITLE_ID}>
        {openProject && <ProjectDetail project={openProject} titleId={DETAIL_TITLE_ID} />}
      </Modal>
    </Section>
  )
}
