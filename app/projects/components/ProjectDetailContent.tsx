'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import SectionReveal from '@/app/about/components/SectionReveal'

type Props = { project: Project }

export default function ProjectDetailContent({ project }: Props) {
  const description = project.fullDescription ?? project.description
  const quickFacts = project.quickFacts ?? []
  const galleryImages = project.galleryImages ?? []
  const hasGallery = galleryImages.length > 0

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)

  useEffect(() => {
    setActiveGalleryIndex(0)
  }, [project.id])

  const heroImageSrc = hasGallery ? galleryImages[activeGalleryIndex] : project.image
  const rightImages = hasGallery ? galleryImages : []

  return (
    <section className="pt-24 pb-12 sm:pb-16 lg:pb-20 bg-white overflow-hidden">
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Image */}
          <SectionReveal>
            {hasGallery ? (
              <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
                {/* Main image */}
                <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-gray-100 h-[360px] sm:h-[460px] lg:h-[640px]">
                  <Link
                    href="/projects"
                    className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/85 hover:bg-white text-gray-900 px-3 py-2 shadow-sm border border-white/60 backdrop-blur transition-colors"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Back</span>
                  </Link>

                  <Image
                    src={heroImageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
                    priority
                  />
                </div>

                {/* Right thumbnails (desktop) */}
                <div className="hidden lg:flex flex-col gap-2 w-[84px] sm:w-[96px] overflow-y-auto pl-1 max-h-[640px]">
                  {rightImages.map((src, index) => {
                    const isActive = index === activeGalleryIndex
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveGalleryIndex(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={[
                          'relative w-full rounded-xl overflow-hidden',
                          'border-2 transition-colors',
                          isActive ? 'border-blue-600' : 'border-transparent hover:border-gray-300',
                        ].join(' ')}
                      >
                        <div className="aspect-[16/9] w-full relative">
                          <Image
                            src={src}
                            alt={`${project.title} image ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 22vw, 96px"
                          />
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Thumbnails grid (mobile) */}
                <div className="lg:hidden flex flex-col">
                  <div className="mt-2">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <h2 className="text-sm font-semibold text-gray-900">Project images</h2>
                      <p className="text-xs text-gray-500">
                        {activeGalleryIndex + 1} / {galleryImages.length}
                      </p>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {galleryImages.map((src, index) => {
                        const isActive = index === activeGalleryIndex
                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setActiveGalleryIndex(index)}
                            aria-label={`View image ${index + 1}`}
                            aria-current={isActive ? 'true' : undefined}
                            className={[
                              'relative w-full aspect-[16/9] rounded-xl overflow-hidden',
                              'border-2 transition-colors',
                              isActive ? 'border-blue-600' : 'border-transparent hover:border-gray-300',
                            ].join(' ')}
                          >
                            <Image
                              src={src}
                              alt={`${project.title} image ${index + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 22vw, 96px"
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 h-[360px] sm:h-[460px] lg:h-[640px]">
                <Image
                  src={heroImageSrc}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </div>
            )}
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
