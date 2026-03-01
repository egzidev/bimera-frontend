'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionReveal from './SectionReveal'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Leonita Pllana',
    role: 'Prefab Structural Designer',
    email: 'leonita.pllana@bimera.se',
    phone: '+383 49 872 447',
    image: '/images/about-us/Leonita.jpeg',
  },
  {
    name: 'Blerta Dina',
    role: 'Structural Engineer',
    email: 'blerta.dina@bimera.se',
    phone: '+383 49 872 447',
    image: '/images/about-us/Blerta.jpeg',
  },
  {
    name: 'Dren Gashi',
    role: 'Founder and Chief Executive',
    email: 'dren.gashi@bimera.se',
    phone: '+46 70 640 35 29',
    image: '/images/about-us/Dren.png',
  },
  {
    name: 'Nicklas Jarl',
    role: 'Co-founder and Growth Lead',
    email: 'nicklas@bimera.se',
    phone: '+46 70 642 13 24',
    image: '/images/about-us/Nicklas Jarl.png',
  },
]

function TeamCard({
  member,
  className = '',
  horizontal = false,
}: {
  member: (typeof team)[0]
  className?: string
  horizontal?: boolean
}) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white hover:border-gray-200 hover:shadow-2xl flex flex-col ${horizontal ? 'h-full' : ''} ${className}`}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0 rounded-l-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        aria-hidden
      />
      <div className={`relative w-full overflow-hidden bg-white/10 transition-colors duration-300 group-hover:bg-transparent ${horizontal ? 'flex-1 min-h-0' : 'aspect-[3/4]'}`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-[center_55%] transition-transform duration-300 group-hover:scale-105"
          sizes={horizontal ? '280px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
        />
      </div>
      <div className="relative z-10 p-6 flex-shrink-0">
        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#004aad] mb-1">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-blue-300 transition-colors duration-300 group-hover:text-gray-700 mb-4">
          {member.role}
        </p>
        <a
          href={`mailto:${member.email}`}
          className="text-white/80 text-sm transition-colors duration-300 block truncate group-hover:text-gray-600 hover:text-gray-900"
        >
          {member.email}
        </a>
        <a
          href={`tel:${member.phone.replace(/\s/g, '')}`}
          className="text-white/80 text-sm transition-colors duration-300 block mt-1 group-hover:text-gray-600 hover:text-gray-900"
        >
          {member.phone}
        </a>
      </div>
    </div>
  )
}

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(max-width: 767px)')

    const setupHorizontalScroll = () => {
      const section = sectionRef.current
      const viewport = viewportRef.current
      const inner = innerRef.current
      if (!section || !viewport || !inner || !mediaQuery.matches) return

      triggerRef.current?.kill()
      gsap.set(inner, { x: 0 })

      const maxScroll = inner.scrollWidth - viewport.clientWidth
      if (maxScroll <= 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(inner, { x: -maxScroll, ease: 'none' })
      triggerRef.current = tl.scrollTrigger ?? null
    }

    const tearDown = () => {
      triggerRef.current?.kill()
      triggerRef.current = null
      if (innerRef.current) gsap.set(innerRef.current, { clearProps: 'all' })
    }

    const onResize = () => {
      const nowMobile = mediaQuery.matches
      setIsMobile(nowMobile)
      if (nowMobile) {
        requestAnimationFrame(() => {
          requestAnimationFrame(setupHorizontalScroll)
        })
      } else {
        tearDown()
      }
    }

    setIsMobile(mediaQuery.matches)
    if (mediaQuery.matches) {
      const t = setTimeout(setupHorizontalScroll, 150)
      return () => {
        clearTimeout(t)
        tearDown()
        mediaQuery.removeEventListener('change', onResize)
        window.removeEventListener('resize', onResize)
      }
    }

    mediaQuery.addEventListener('change', onResize)
    window.addEventListener('resize', onResize)
    return () => {
      tearDown()
      mediaQuery.removeEventListener('change', onResize)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section
      id="team"
      ref={sectionRef}
      className="min-h-screen md:min-h-0 py-12 sm:py-16 lg:py-20 bg-[#003d8a] overflow-hidden flex flex-col justify-center md:flex-none md:justify-start"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionReveal className="mb-6 md:mb-10">
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
            People
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mt-2">
            Our team
          </h2>
        </SectionReveal>

        {/* Mobile: horizontal scroll strip (scroll-driven by GSAP) */}
        <div
          ref={viewportRef}
          className="md:hidden overflow-hidden -mx-4"
          aria-hidden={!isMobile}
        >
          <div
            ref={innerRef}
            className="flex flex-nowrap gap-4 px-4 pr-[max(1rem,calc(50vw-140px))]"
            style={{ width: 'max-content' }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="w-[280px] flex-shrink-0 min-h-[70vh] md:min-h-0 last:mr-6 md:last:mr-0"
              >
                <TeamCard member={member} horizontal />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <SectionReveal key={member.name} delay={index * 0.05}>
              <TeamCard member={member} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
