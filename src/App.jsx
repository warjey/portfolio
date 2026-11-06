import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import About from './components/sections/About'
import Achievements from './components/sections/Achievements'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import Education from './components/sections/Education'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
