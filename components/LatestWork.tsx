'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Kv Toften',
    location: 'Uddevalla, Sweden',
    description: 'This project is an industrial building for which we designed the floor system…',
    image: '/images/render1.jpg',
  },
  {
    title: 'Götene Badhus',
    location: 'Götene, Sweden',
    description: 'This project is an industrial building for which we designed the floor system…',
    image: '/images/render2.jpg',
  },
  {
    title: 'Kingly Windows',
    location: 'Pejë, Kosovo',
    description: 'This project is an industrial building for which we designed the floor system…',
    image: '/images/render3.jpg',
  },
  {
    title: 'Söderskola',
    location: 'Halmstad, Sweden',
    description: 'This project is an industrial building for which we designed the floor system…',
    image: '/images/render4.webp',
  },
]


export default function LatestWork() {
  const ref = useRef(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Create a scroll progress - use ref as fallback to avoid hydration error
  const { scrollYProgress } = useScroll({
    target: sectionRef.current ? sectionRef : ref,
    offset: ["start start", "end end"]
  })

  // Mobile detection and resize handler
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const galleryStripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobile) {
      setActiveCardIndex(0)
      setExpandedIndex(null)
      return
    }

    if (!sectionRef.current || !galleryStripRef.current) return

    const pinWrap = galleryStripRef.current
    let pinWrapWidth: number
    let horizontalScrollLength: number

    function refresh() {
      pinWrapWidth = pinWrap.scrollWidth
      horizontalScrollLength = pinWrapWidth - window.innerWidth
    }

    refresh()

    // Get header height (estimate or measure)
    const headerHeight = 80 // Adjust this to match your actual header height

    // Pinning and horizontal scrolling
    const scrollTrigger = gsap.to(pinWrap, {
      scrollTrigger: {
        scrub: true,
        trigger: sectionRef.current,
        pin: sectionRef.current,
        pinSpacing: true,
        start: `top top+=${headerHeight}`,
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Calculate active card based on scroll progress
          const progress = self.progress
          const cardIndex = Math.floor(progress * (projects.length - 1))
          const clampedIndex = Math.max(0, Math.min(cardIndex, projects.length - 1))
          setActiveCardIndex(clampedIndex)
          setExpandedIndex(clampedIndex)
        },
      },
      x: () => -horizontalScrollLength,
      ease: 'none',
    })

    ScrollTrigger.addEventListener('refreshInit', refresh)

    // Set first card as active by default
    setActiveCardIndex(0)
    setExpandedIndex(0)

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', refresh)
      if (scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill()
      }
      scrollTrigger.kill()
      ScrollTrigger.refresh()
    }
  }, [isMobile])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }

  // Mobile horizontal scrolling gallery
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="portfolio"
        className="relative bg-white overflow-hidden"
      >
        <div className="w-full" style={{ paddingBottom: '40px' }}>
          <div className="horiz-gallery-wrapper flex flex-nowrap will-change-transform relative">
            <div
              ref={galleryStripRef}
              className="horiz-gallery-strip flex flex-nowrap will-change-transform relative"
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="project-wrap relative rounded-2xl overflow-hidden"
                  style={{
                    width: '85vw',
                    padding: '1rem',
                    boxSizing: 'content-box',
                  }}
                >
                  <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: 'brightness(0.7) contrast(1.1) saturate(0.9)',
                        }}
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to top, hsl(20 10% 10% / 0.7) 0%, hsl(20 10% 15% / 0.3) 50%, hsl(20 10% 20% / 0.2) 100%)',
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      {activeCardIndex === index ? (
                        <motion.div
                          initial={{ opacity: 0, y: 60 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <h3 className="text-white text-3xl font-semibold drop-shadow-lg mb-2">
                            {project.title}
                          </h3>
                          <p className="text-white/90 text-base mb-3 font-medium">
                            {project.location}
                          </p>
                          <p className="text-white/90 text-lg leading-relaxed">
                            {project.description}
                          </p>
                          <motion.div
                            className="absolute bottom-6 right-6"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.button
                              className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md bg-white/20 border border-white/30"
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ transform: 'rotate(45deg)' }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.h3
                          className="text-white text-3xl font-semibold drop-shadow-lg"
                          style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            whiteSpace: 'nowrap',
                            transformOrigin: 'center center',
                          }}
                          animate={{
                            x: '-50%',
                            y: '-50%',
                            rotate: -90,
                          }}
                        >
                          {project.title}
                        </motion.h3>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop layout (unchanged)
  return (
    <section ref={ref} id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with title and link */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4 md:mb-0">
            Our latest work
          </h2>
          <a
            href="#projects"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 inline-flex items-center"
          >
            See all our projects
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>

        {/* Project Cards Grid - Auto-sizing container */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              width: '100%',
            }}
          >
            {projects.map((project, index) => {
              const isExpanded = expandedIndex === index

              return (
                <motion.div
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group h-[580px]"
                  variants={cardVariants}
                  initial={false}
                  animate={{
                    flex: isExpanded ? '2 1 0%' : '1 1 0%',
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setExpandedIndex(index)}
                >
                  {/* Background Image with darkened filter */}
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        filter: 'brightness(0.7) contrast(1.1) saturate(0.9)',
                      }}
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, hsl(20 10% 10% / 0.7) 0%, hsl(20 10% 15% / 0.3) 50%, hsl(20 10% 20% / 0.2) 100%)',
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                    {/* White Text Label - Bottom Left */}
                    <div className="mb-4">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="expanded"
                            initial={{
                              opacity: 0,
                              x: -20,
                              rotate: -90,
                              scale: 0.8
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              rotate: 0,
                              scale: 1
                            }}
                            exit={{
                              opacity: 0,
                              x: -20,
                              rotate: -90,
                              scale: 0.8
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                          >
                            <h3 className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg mb-2">
                              {project.title}
                            </h3>
                            <motion.div
                              initial={{ opacity: 0, y: 60 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 60 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.15,
                                ease: [0.22, 1, 0.36, 1]
                              }}
                            >
                              <p className="text-white/90 text-sm md:text-base mb-3 font-medium">
                                {project.location}
                              </p>
                              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
                                {project.description}
                              </p>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.h3
                            key="collapsed"
                            className="text-white text-2xl md:text-3xl font-semibold drop-shadow-lg"
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              whiteSpace: 'nowrap',
                              transformOrigin: 'center center',
                            }}
                            initial={{ opacity: 0, x: '-50%', y: '-50%', rotate: 0, scale: 0.8 }}
                            animate={{ opacity: 1, x: '-50%', y: '-50%', rotate: -90, scale: 1 }}
                            exit={{ opacity: 0, x: '-50%', y: '-50%', rotate: 0, scale: 0.8 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                          >
                            {project.title}
                          </motion.h3>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Circular Navigation Button - Bottom Right - Only show when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="absolute bottom-6 right-6"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl backdrop-blur-md bg-white/20 border border-white/30"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle navigation
                            }}
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{
                                transform: 'rotate(45deg)',
                              }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
