'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'

export default function Mission() {
  return (
    <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text: first on mobile, left on lg */}
          <div className="space-y-6 order-1 lg:order-1">
            <SectionReveal>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Purpose
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Our mission is to grow into a multidisciplinary engineering brand that actively contributes to design, construction, manufacturing, and innovation within the construction industry. We aim to become a trusted partner within the European market while promoting responsible and transparent outsourcing models.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                By combining technical excellence with efficient cross-border collaboration, we strive to support economic development in countries such as Kosovo that aspire to closer integration with the European Union. Through our work, we seek to create long-term value for our clients, our partners, and the communities we are part of.
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
