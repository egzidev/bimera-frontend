'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Structural Calculations',
    description: 'We ensure that your structure can endure all external forces by delivering a robust design that complies with Eurocode standards.',
  },
  {
    title: 'BIM Management',
    description: 'We transform traditional management into building information modeling, guaranteeing that every detail is accounted for from start to finish.',
  },
  {
    title: 'Structural Drawings',
    description: 'Your project deserves clear and easy-to-read drawings that capture every detail, and that is precisely what we offer.',
  },
]

const materials = [
  {
    title: 'Precast Frames',
    image: '/images/services/precast.png',
    description: 'Efficient and cost-effective structural solutions with precast concrete frames. Perfect for rapid construction and consistent quality.',
    overlayColor: 'bg-blue-400/30' // Light blue overlay
  },
  {
    title: 'Steel Frames',
    image: '/images/services/steel.png',
    description: 'Strong and versatile steel frame structures for modern construction. Ideal for large spans and flexible design requirements.',
    overlayColor: 'bg-transparent' // No overlay when active
  },
  {
    title: 'In-situ Frames',
    image: '/images/services/in-situ.png',
    description: 'Custom concrete frames built on-site for maximum design flexibility. Tailored solutions for unique architectural requirements.',
    overlayColor: 'bg-slate-700/40' // Dark blue-grey overlay
  },
  {
    title: 'Timber and Composite',
    image: '/images/services/timber-and-composite.png',
    description: 'Sustainable timber and composite material solutions for eco-friendly construction. Combining natural beauty with modern engineering.',
    overlayColor: 'bg-orange-900/30' // Warm brown/orange overlay
  },
]

// Mobile Material Card Section Component
function MobileMaterialSection({
  material,
  index,
  isMobile,
}: {
  material: typeof materials[0]
  index: number
  isMobile: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Scroll progress for the section - smoother detection
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"]
  })

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  })

  // Title vertical movement - starts from top of card and moves down
  // Title moves from top position to its final position near description
  const titleY = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [-100, 40, 40, 40] // Start from top, move down to position above description, then stay
  )

  // Card opacity - fade in smoothly
  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  )

  // Card scale - subtle scale effect
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  )

  if (!isMobile) return null

  return (
    <motion.section
      ref={sectionRef}
      className="h-screen snap-start snap-always flex justify-center items-center relative px-4"
    >
      <motion.div
        className="w-full max-w-md rounded-2xl overflow-hidden relative shadow-2xl"
        style={{
          height: 'calc(100vh - 160px)',
          opacity: cardOpacity,
          scale: cardScale,
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${material.image})`,
          }}
        />

        {/* Black Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

        {/* Title - starts from top */}
        <motion.h3
          ref={titleRef}
          className="font-semibold drop-shadow-lg text-4xl text-white text-center absolute top-12 left-0 right-0 px-6"
          style={{ y: titleY }}
        >
          {material.title}
        </motion.h3>

        {/* Description - stays at bottom */}
        <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-8">
          <p className="text-white/90 text-xl md:text-xl leading-relaxed max-w-lg font-medium text-center">
            {material.description}
          </p>
        </div>
      </motion.div>
    </motion.section>
  )
}

// Material Card Component for Desktop
function MaterialCard({
  material,
  index,
  isActive,
  activeMaterial,
  isVisible,
  isMobile,
  onMouseEnter,
  sectionRef,
}: {
  material: typeof materials[0]
  index: number
  isActive: boolean
  activeMaterial: number
  isVisible: boolean
  isMobile: boolean
  onMouseEnter: (index: number) => void
  sectionRef: React.RefObject<HTMLElement>
}) {
  // Calculate z-index: active on top, then previous cards in reverse order, then next cards
  let zIndex: number
  if (isActive) {
    zIndex = 60 // Active card on top
  } else if (index < activeMaterial) {
    // Cards before active: most recent first (second card behind active, first behind second)
    zIndex = 50 - (activeMaterial - index)
  } else {
    // Cards after active: lower z-index
    zIndex = 5 - (index - activeMaterial)
  }

  // Desktop only - return null on mobile
  if (isMobile) return null

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      className={`absolute left-0 right-0 rounded-2xl overflow-hidden cursor-pointer ${isVisible
        ? 'opacity-100'
        : 'opacity-0'
        } ${isActive ? 'shadow-2xl scale-[1.02]' : 'shadow-sm'}`}
      style={{
        top: `${index * 80}px`,
        height: '100%',
        zIndex: zIndex,
        transitionDelay: `${index - activeMaterial * 100}ms`,
        transitionDuration: '300ms',
        transitionProperty: 'all',
      }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isMobile
          ? 'scale-100 blur-0' // Always clear on mobile
          : isActive
            ? 'scale-100 blur-0'
            : 'scale-110 blur-md'
          }`}
        style={{
          backgroundImage: `url(${material.image})`,
        }}
      />

      {/* Colored Overlay - only on inactive cards (desktop only) */}
      {!isMobile && !isActive && (
        <div className={`absolute inset-0 transition-opacity duration-300 ${material.overlayColor}`} />
      )}

      {/* Black Overlay for text readability - always on mobile, only when active on desktop */}
      {(isMobile || isActive) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 transition-opacity duration-300" />
      )}

      {/* Content */}
      {isMobile ? (
        // Mobile: Always show active design (title + description at bottom)
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 transition-all duration-300">
          <h3 className="font-semibold drop-shadow-lg text-4xl text-white mb-4 transition-all duration-300 transform">
            {material.title}
          </h3>
          <p className="text-white/90 text-base leading-relaxed max-w-lg font-medium transition-all duration-300 transform">
            {material.description}
          </p>
        </div>
      ) : isActive ? (
        // Desktop: Active card - title+description at bottom
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 transition-all duration-300">
          <h3 className="font-semibold drop-shadow-lg text-4xl text-white mb-4 transition-all duration-300 transform">
            {material.title}
          </h3>
          <p className="text-white/90 text-base leading-relaxed max-w-lg font-medium transition-all duration-300 transform">
            {material.description}
          </p>
        </div>
      ) : index > activeMaterial ? (
        // Desktop: Cards after active - title at bottom
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-4 transition-all duration-300">
          <h3 className="font-semibold drop-shadow-lg text-3xl text-gray-300 transition-all duration-300">
            {material.title}
          </h3>
        </div>
      ) : (
        // Desktop: Cards before active - title at top
        <div className="absolute inset-0 flex flex-col px-6 pt-4 transition-all duration-300">
          <h3 className="font-semibold drop-shadow-lg text-3xl text-gray-300 transition-all duration-300">
            {material.title}
          </h3>
        </div>
      )}
    </div>
  )
}

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeMaterial, setActiveMaterial] = useState<number>(0) // First card active by default
  const [hasInteracted, setHasInteracted] = useState(false) // Track if user has hovered
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const materialsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const arrowBtnRefs = useRef<(HTMLDivElement | null)[]>([])

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('services')
      if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Check if section is visible
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (index: number) => {
    // Clear any pending timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    // Immediate response, no delay
    setActiveMaterial(index)
    setHasInteracted(true) // Mark that user has interacted
  }

  const handleMouseLeave = () => {
    // Only reset to first card if user hasn't interacted yet
    // After first interaction, keep the last hovered card or don't reset
    if (!hasInteracted) {
      setActiveMaterial(0) // Reset to first card only on initial load, no delay
    }
  }

  // Progress bar scroll progress
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })
  const progressScaleX = useSpring(useTransform(sectionScrollProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
  })

  const servicesColumnRef = useRef<HTMLDivElement>(null)

  // GSAP ScrollTrigger: parallax + creative reveal on service cards (desktop only)
  useEffect(() => {
    if (isMobile || !sectionRef.current || !servicesColumnRef.current) return

    const cards = servicesColumnRef.current.querySelectorAll<HTMLElement>('[data-service-card]')
    const circle = servicesColumnRef.current.querySelector<HTMLElement>('[data-service-parallax-circle]')
    const noiseTrio = sectionRef.current?.querySelector<HTMLElement>('[data-service-noise-trio]')
    const triggers: ScrollTrigger[] = []

    // Service cards: continuous parallax — each moves at different rate as you scroll
    cards.forEach((card, i) => {
      // Different parallax speeds per card for depth effect
      const yPercentStart = [-20, -35, -50][i] ?? -30
      const yPercentEnd = [15, 25, 35][i] ?? 20
      const anim = gsap.fromTo(
        card,
        { yPercent: yPercentStart, opacity: 0.7 },
        {
          yPercent: yPercentEnd,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    // Single shared circle: one container, moves with scroll (parallax) behind all cards
    if (circle && sectionRef.current) {
      const anim = gsap.fromTo(
        circle,
        { yPercent: -30 },
        {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    // Noise + trio colors: parallax on scroll (GSAP)
    if (noiseTrio && sectionRef.current) {
      const anim = gsap.fromTo(
        noiseTrio,
        { yPercent: -25 },
        {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
        }
      )
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    return () => {
      triggers.forEach((t) => t.kill())
      ScrollTrigger.refresh()
    }
  }, [isMobile])

  return (
    <motion.section
      id="services"
      ref={sectionRef}
      className={`relative bg-white   ${isMobile ? 'snap-y snap-mandatory' : 'pb-[50px] pt-10'}`}
      style={isMobile ? {
        height: 'auto',
      } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mobile: Show material cards in separate sections */}
      {isMobile ? (
        <>
          {materials.map((material, index) => (
            <MobileMaterialSection
              key={index}
              material={material}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </>
      ) : (
        /* Desktop: noise-trio full-bleed + services and materials side by side */
        <>
          {/* Noise + trio colors — rounded shape, full viewport width, behind all section content */}
          <div
            data-service-noise-trio
            className="absolute top-[-100px] bottom-0 left-1/2 w-full -translate-x-1/2 pointer-events-none z-0 rounded-[2rem] overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,74,173,0.08) 0%, rgba(91,143,212,0.06) 45%, rgba(232,236,242,0.1) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
              backgroundSize: 'cover, 200px 200px',
              backgroundRepeat: 'no-repeat, repeat',
              backgroundBlendMode: 'normal, overlay',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-14">
          <h2
            className={`text-4xl md:text-5xl font-medium text-gray-900 transition-all duration-800 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
          >
            Our Services
          </h2>
          <p
            className={`text-gray-600 text-lg transition-all duration-1000 max-w-2xl ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '100ms' }}
          >
            Our team specializes in all types of structural frames and materials.
          </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Services: circle + GSAP parallax cards (noise-trio is at section level, full viewport) */}
            <div ref={servicesColumnRef} className="relative overflow-visible">
              {/* Single shared circle — at left edge of screen, blurred; overflow-visible on parent avoids clipping */}
              <div
                data-service-parallax-circle
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,380px)] h-[min(72vw,380px)] rounded-full pointer-events-none z-0 blur-xl"
                style={{
                  background: 'radial-gradient(ellipse 100% 100% at 70% 50%, rgba(0,74,173,0.14) 0%, rgba(0,74,173,0.07) 35%, rgba(0,74,173,0.02) 55%, transparent 65%)',
                }}
              />
              <div className="relative z-10 space-y-10">
                {services.map((service, index) => (
                  <div
                    key={index}
                    data-service-card
                    className="group relative p-8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-100 min-h-[120px] h-[180px] border border-white/50 bg-white/40 backdrop-blur-2xl shadow-xl shadow-gray-300/20"
                    onMouseEnter={(e) => {
                      setHoveredCardIndex(index)
                      const rect = e.currentTarget.getBoundingClientRect()
                      const px = e.clientX - rect.left - 32
                      const py = e.clientY - rect.top - 44
                      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                      const btn = arrowBtnRefs.current[index]
                      if (btn) gsap.set(btn, { x: px, y: py })
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const px = e.clientX - rect.left - 32
                      const py = e.clientY - rect.top - 44
                      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                      const btn = arrowBtnRefs.current[index]
                      if (btn) gsap.to(btn, { x: px, y: py, duration: 0.14, ease: 'power2.out', overwrite: 'auto' })
                    }}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    {/* Left edge gradient stripe — visual anchor */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0 rounded-l-2xl bg-gradient-to-b from-[#004aad] to-[#004aad]/30 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden
                  />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 z-[1]"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(0, 74, 173, 0.2), rgba(0, 74, 173, 0.15))',
                    }}
                  />

                  {/* Floating arrow button — diagonal up-right, glassy + Apple-style glass lens behind */}
                  <div
                    className="absolute inset-0 pointer-events-none z-20 overflow-visible"
                    aria-hidden={hoveredCardIndex !== index}
                  >
                    {/* Glass lens / eye effect behind button — Apple-style frosted orb */}
                    <div
                      ref={(el) => { (arrowBtnRefs.current as (HTMLDivElement | null)[])[index] = el }}
                      data-service-arrow-btn
                      className="absolute left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        opacity: hoveredCardIndex === index ? 1 : 0,
                        pointerEvents: 'none',
                      }}
                    >
                      {/* Back layer: soft glass lens blur */}
                      <div
                        className="absolute inset-0 rounded-full opacity-90"
                        style={{
                          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 40%, rgba(0,74,173,0.08) 70%, transparent 100%)',
                          filter: 'blur(12px)',
                          transform: 'scale(1.4)',
                        }}
                      />
                      {/* Button: glassy, diagonal arrow up-right */}
                      <div
                        className="relative w-10 h-10 rounded-full flex items-center justify-center border border-white/60 bg-white/30 backdrop-blur-xl shadow-lg"
                        style={{
                          boxShadow: '0 4px 24px rgba(0,74,173,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                        }}
                      >
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-[#004aad] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(-45deg)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col z-10">
                    <div className="flex-1 mt-0">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-[#004aad] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base group-hover:text-[#004aad] transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Right Column - Materials with Same Size, Overlay on Hover */}
            <div
              className="relative"
              onMouseLeave={handleMouseLeave}
              ref={materialsRef}
            >
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-96 lg:h-96"
              >
                {materials.map((material, index) => (
                  <MaterialCard
                    key={index}
                    material={material}
                    index={index}
                    isActive={activeMaterial === index}
                    activeMaterial={activeMaterial}
                    isVisible={isVisible}
                    isMobile={isMobile}
                    onMouseEnter={handleMouseEnter}
                    sectionRef={sectionRef}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
        </>
      )}

    </motion.section>
  )
}
