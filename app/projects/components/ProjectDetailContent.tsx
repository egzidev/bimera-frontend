'use client'

import Image from 'next/image'
import type { Project } from '@/lib/projects'
import SectionReveal from '@/app/about/components/SectionReveal'

type Props = { project: Project }

export default function ProjectDetailContent({ project }: Props) {
  const description = project.fullDescription ?? project.description
  const quickFacts = project.quickFacts ?? []

  return (
    <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: image + description */}
          <div className="lg:col-span-8 space-y-6">
            <SectionReveal>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {description}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Right: quick facts – neutral soft card, no shadow, no border */}
          <div className="lg:col-span-4 lg:pt-0">
            <SectionReveal delay={0.15}>
              <div className="lg:sticky lg:top-28 rounded-2xl bg-gray-100/70 p-6 sm:p-8 shadow-none border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Quick facts
                </h3>
                <dl className="space-y-4">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="flex flex-col sm:flex-row sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500 shrink-0 sm:w-24">
                        {fact.label}
                      </dt>
                      <dd className="text-gray-900 font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-sm text-gray-500 mt-6 pt-6">
                  {project.location}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
