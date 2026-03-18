'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from './components/Hero'
import ProjectCards from './components/ProjectCards'

export default function ProjectsPage() {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 0 : 3,
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
