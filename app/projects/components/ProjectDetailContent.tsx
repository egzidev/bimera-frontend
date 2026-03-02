'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import SectionReveal from '@/app/about/components/SectionReveal'

type Props = { project: Project }

export default function ProjectDetailContent({ project }: Props) {
  const description = project.fullDescription ?? project.description
  const quickFacts = project.quickFacts ?? []

  return (
    <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-white overflow-hidden">
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Back to projects */}
          <SectionReveal>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>
          </SectionReveal>
          {/* Image */}
          <SectionReveal>
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </SectionReveal>
          {/* Description + Quick facts as grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7 space-y-6">
              <SectionReveal delay={0.05}>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {project.title}
                </h1>
                <p className="text-gray-600 mt-1 sm:mt-2">
                  {project.location}
                </p>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              </SectionReveal>
            </div>
            <div className="lg:col-span-5">
              <SectionReveal delay={0.15}>
                <div className="rounded-2xl bg-gray-100/70 p-6 sm:p-8 shadow-none border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick facts
                  </h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {quickFacts.map((fact) => (
                      <div key={fact.label} className="flex flex-col gap-0.5">
                        <dt className="text-sm font-medium text-gray-500">
                          {fact.label}
                        </dt>
                        <dd className="text-gray-900 font-medium">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
