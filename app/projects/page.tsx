'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import ProjectCards from './components/ProjectCards'

export default function ProjectsPage() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <main>
          <Hero />
          <ProjectCards />
        </main>
        <Footer />
      </div>
    </div>
  )
}
