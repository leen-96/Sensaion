import './App.css'
import { Navbar } from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProgramsSection from './components/ProgramsSection'
import TransformationSection from './components/TransformationSection'
import EnergySection from './components/EnergySection'
import TrainersSection from './components/TrainersSection'
import MembershipSection from './components/MembershipSection'
import FinalCTA from './components/FinalCTA'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <TransformationSection />
        <EnergySection />
        <TrainersSection />
        <MembershipSection />
        <FinalCTA />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Sensaion Gym</span>
        <span className="site-footer__sep">·</span>
        <span>Train Hard. Feel Strong.</span>
      </footer>
    </>
  )
}

export default App
