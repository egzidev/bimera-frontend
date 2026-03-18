'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'
import { useT } from '@/components/i18n/useT'

export default function Mission() {
  const t = useT()
  return (
    <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text: first on mobile, left on lg */}
          <div className="space-y-6 order-1 lg:order-1">
            <SectionReveal>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                {t('aboutPage.mission.smallLabel')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
                {t('aboutPage.mission.title')}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('aboutPage.mission.paragraph1')}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('aboutPage.mission.paragraph2')}
              </p>
            </SectionReveal>
          </div>
          {/* Image: second on mobile, right on lg */}
          <SectionReveal delay={0.1} className="relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden order-2 lg:order-2">
            <Image
              src="/images/about-us/mission.jpg"
              alt="Our mission"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
