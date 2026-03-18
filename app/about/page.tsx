'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import Story from './components/Story'
import Mission from './components/Mission'
import Team from './components/Team'
import Structure from './components/Structure'

export default function AboutPage() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <main>
          <Hero />
          <Story />
          <Mission />
          <Team />
          <Structure />
        </main>
        <Footer />
      </div>
    </div>
  )
}
