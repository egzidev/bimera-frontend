import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import LatestWork from '@/components/LatestWork'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Partners />
        <Testimonials />
        <LatestWork />
      </main>
      <Footer />
    </>
  )
}
