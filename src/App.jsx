import Header from './components/Header'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Posters from './sections/Posters'
import Reels from './sections/Reels'
import Process from './sections/Process'
import WhyUs from './sections/WhyUs'
import LogoMarquee from './sections/LogoMarquee'
import Contact from './sections/Contact'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="bg-charcoal text-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Posters />
        <Reels />
        <Process />
        <WhyUs />
        <LogoMarquee />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
