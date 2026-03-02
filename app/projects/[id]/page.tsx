'use client'

import { useEffect, useRef } from 'react'
import { useParams, notFound } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectDetailContent from '../components/ProjectDetailContent'
import MoreProjects from '../components/MoreProjects'
import { getProjectById } from '@/lib/projects'

export default function ProjectDetailPage() {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : ''
  const project = getProjectById(id)
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 3,
      effects: true,
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

  if (!project) notFound()

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Header />
        <main>
          <ProjectDetailContent project={project} />
          <MoreProjects currentProjectId={project.id} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
