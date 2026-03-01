'use client'

import { useRef } from 'react'
import SectionReveal from './SectionReveal'
import FlipScroll from './FlipScroll'

export default function Structure() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="structure" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            How we operate
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
            Company Structure
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Bimera operates through a transparent and compliant cross-border structure designed for efficient, high-quality delivery. We consist of two legally independent sister companies in Sweden and Kosovo, working under the same brand, standards, and quality systems.
          </p>

          <SectionReveal delay={0.15} className="mt-8">
            <div className="rounded-2xl p-6 sm:p-8 bg-[#004AAD] text-white">
              <p className="text-base sm:text-lg leading-relaxed text-white/95">
                This setup ensures clear responsibilities, full transparency, regulatory compliance, and efficient delivery—while contributing to sustainable growth and knowledge development in both countries.
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
