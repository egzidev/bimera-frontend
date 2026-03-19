'use client'

import { useRef } from 'react'
import SectionReveal from './SectionReveal'
import FlipScroll from './FlipScroll'
import { useT } from '@/components/i18n/useT'

export default function Structure() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useT()

  return (
    <section ref={sectionRef} id="structure" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {t('aboutPage.structure.smallLabel')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
            {t('aboutPage.structure.title')}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {t('aboutPage.structure.paragraph1')}
          </p>

          <SectionReveal delay={0.15} className="mt-8">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#004AAD] text-white">
              <p className="text-base sm:text-lg leading-relaxed text-white/95">
                {t('aboutPage.structure.callout')}
              </p>
            </div>
          </SectionReveal>
        </SectionReveal>

        <div className="relative h-[1000px] md:h-[720px] mt-12 lg:mt-16">
          <FlipScroll embedded triggerRef={sectionRef} />
        </div>
      </div>
    </section>
  )
}
