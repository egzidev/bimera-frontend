'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'

const team = [
  {
    name: 'Leonita Pllana',
    role: 'Prefab Structural Designer',
    email: 'leonita.pllana@bimera.se',
    phone: '+383 49 872 447',
    image: '/images/about-us/Leonita.jpeg',
  },
  {
    name: 'Blerta Dina',
    role: 'Structural Engineer',
    email: 'blerta.dina@bimera.se',
    phone: '+383 49 872 447',
    image: '/images/about-us/Blerta.jpeg',
  },
  {
    name: 'Dren Gashi',
    role: 'Founder and Chief Executive',
    email: 'dren.gashi@bimera.se',
    phone: '+46 70 640 35 29',
    image: '/images/about-us/Dren.png',
  },
  {
    name: 'Nicklas Jarl',
    role: 'Co-founder and Growth Lead',
    email: 'nicklas@bimera.se',
    phone: '+46 70 642 13 24',
    image: '/images/about-us/Nicklas Jarl.png',
  },
]

export default function Team() {
  return (
    <section id="team" className="py-12 sm:py-16 lg:py-20 bg-[#003d8a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-10">
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
            People
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium text-white mt-2">
            Our team
          </h2>
        </SectionReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <SectionReveal key={member.name} delay={index * 0.05}>
              <div className="group relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white hover:border-gray-200 hover:shadow-2xl">
                <div className="absolute left-0 top-0 bottom-0 w-0 rounded-l-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden />
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/10 transition-colors duration-300 group-hover:bg-transparent">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-[center_55%] transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative z-10 p-6">
                  <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#004aad] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-blue-300 transition-colors duration-300 group-hover:text-gray-700 mb-4">
                    {member.role}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-white/80 text-sm transition-colors duration-300 block truncate group-hover:text-gray-600 hover:text-gray-900"
                  >
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="text-white/80 text-sm transition-colors duration-300 block mt-1 group-hover:text-gray-600 hover:text-gray-900"
                  >
                    {member.phone}
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
