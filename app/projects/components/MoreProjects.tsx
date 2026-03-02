'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getMoreProjects } from '@/lib/projects'
import SectionReveal from '@/app/about/components/SectionReveal'

type Props = { currentProjectId: string }

export default function MoreProjects({ currentProjectId }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const moreProjects = getMoreProjects(currentProjectId, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
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
      id="more-projects"
      className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 overflow-hidden"
    >
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-10">
          <SectionReveal>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              More from our portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mt-2">
              More projects
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1} className="sm:ml-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              See all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </SectionReveal>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {moreProjects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-[420px] sm:h-[460px] lg:h-[480px]"
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                <div className="relative z-10 p-4 sm:p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-lg mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm font-medium mb-2">
                      {project.location}
                    </p>
                    <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md line-clamp-3">
                      {project.description}
                    </p>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + index * 0.08,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full shadow-xl backdrop-blur-md bg-white/20 border border-white/30 group-hover:bg-white/30 transition-colors"
                      aria-hidden
                    >
                      <svg
                        className="w-4 h-4 text-white"
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
