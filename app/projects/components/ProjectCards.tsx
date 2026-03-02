'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/projects'
import SectionReveal from '@/app/about/components/SectionReveal'

export default function ProjectCards() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={sectionRef}
      id="projects-grid"
      className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
            All projects
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            A selection of our structural engineering and design work.
          </p>
        </SectionReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[420px] sm:h-[480px] lg:h-[520px]"
            >
              <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 flex flex-col justify-end"
                aria-label={`View ${project.title}`}
              >
                <div className="absolute inset-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        filter: 'brightness(0.7) contrast(1.1) saturate(0.9)',
                      }}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, hsl(20 10% 10% / 0.75) 0%, hsl(20 10% 15% / 0.35) 45%, hsl(20 10% 20% / 0.2) 100%)',
                    }}
                  />
                </div>

                <div className="relative z-10 p-6 sm:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <h3 className="text-white text-2xl sm:text-3xl font-semibold drop-shadow-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm sm:text-base font-medium mb-3">
                      {project.location}
                    </p>
                    <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + index * 0.08,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full shadow-xl backdrop-blur-md bg-white/20 border border-white/30 group-hover:bg-white/30 transition-colors"
                      aria-hidden
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ transform: 'rotate(45deg)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
