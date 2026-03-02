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
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={sectionRef}
      id="more-projects"
      className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {moreProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              className="group"
            >
              <Link href={`/projects/${project.id}`} className="block">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: 'brightness(0.75) contrast(1.05)',
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to top, hsl(20 10% 10% / 0.5) 0%, transparent 50%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-white drop-shadow-md">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/90">{project.location}</p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
