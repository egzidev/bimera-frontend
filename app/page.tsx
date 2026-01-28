'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Partners from '@/components/Partners'
import Testimonials from '@/components/Testimonials'
import LatestWork from '@/components/LatestWork'
import Footer from '@/components/Footer'
import Welcome from '@/components/Welcome'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  const handleWelcomeComplete = () => {
    setShowWelcome(false)

    // bring the site (hero) from bottom after welcome
    requestAnimationFrame(() => {
      if (!mainRef.current) return
      gsap.fromTo(
        mainRef.current,
        { y:200, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.1, 
          ease: 'power3.out',
          onComplete: () => {
            // Clear any transform that might interfere with ScrollTrigger
            if (mainRef.current) {
              gsap.set(mainRef.current, { clearProps: 'transform' })
            }
            // Refresh ScrollTrigger after animation completes
            ScrollTrigger.refresh()
          }
        }
      )
    })
  }

  return (
    <>
      {showWelcome && <Welcome onComplete={handleWelcomeComplete} />}
      <Header />
      <main
        ref={mainRef}
        style={showWelcome ? { opacity: 0 } : undefined}
      >
        <Hero />
        <Services />
        <LatestWork />
        <About />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
