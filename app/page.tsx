'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
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
  const smootherRef = useRef<ScrollSmoother | null>(null)

  // Initialize ScrollSmoother
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    // Create ScrollSmoother FIRST, before any ScrollTriggers
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 0 : 1.2,
      effects: !isMobile,
      normalizeScroll: true,
      ignoreMobileResize: true,
    })

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill()
        smootherRef.current = null
      }
    }
  }, [])

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
            // Refresh ScrollTrigger and ScrollSmoother after animation completes
            ScrollTrigger.refresh()
            if (smootherRef.current) {
              smootherRef.current.refresh()
            }
          }
        }
      )
    })
  }

  return (
    <>
      {showWelcome && <Welcome onComplete={handleWelcomeComplete} />}
      <div id="smooth-wrapper">
        <div id="smooth-content">
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
        </div>
      </div>
    </>
  )
}
