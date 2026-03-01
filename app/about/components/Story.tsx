'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'

export default function Story() {
  return (
    <section id="story" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image: second on mobile, left on lg */}
          <SectionReveal className="relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/about-us/started.jpg"
              alt="Where it started"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </SectionReveal>
          {/* Text: first on mobile, right on lg */}
          <div className="space-y-6 order-1 lg:order-2">
            <SectionReveal>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Our story
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mt-2 mb-6">
                Where it started
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Bimera started in May 2023 when six engineers decided to turn ambition and coffee into structural engineering across Sweden and Kosovo. We believed in smart collaboration between established EU markets and high-talent teams in Kosovo — and we still do.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Like many startups, we met a few economic plot twists after COVID. So in October 2024, we rebooted — leaner, sharper, and focused — with two engineers and a clearer strategy. Since then, we&apos;ve been growing steadily, delivering reliable structural design with innovation, resilience, and sustainability at the core.
              </p>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
