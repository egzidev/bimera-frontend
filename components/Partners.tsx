'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

// Company logos - all partners
const companies = [
  { name: 'Partner 1', logo: '/images/partners/1.svg', id: 1 },
  { name: 'Partner 2', logo: '/images/partners/2.svg', id: 2 },
  { name: 'Partner 3', logo: '/images/partners/3.svg', id: 3 },
  { name: 'Partner 4', logo: '/images/partners/4.svg', id: 4 },
  { name: 'Partner 5', logo: '/images/partners/5.svg', id: 5 },
  { name: 'Partner 6', logo: '/images/partners/6.svg', id: 6 },
]

function PartnerItem({
  company,
  onHover
}: {
  company: { name: string; logo: string; id: number }
  onHover: (hovered: boolean) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 px-4 md:px-6 lg:px-8 flex items-center justify-center"
      onMouseEnter={() => {
        setIsHovered(true)
        onHover(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover(false)
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-48 md:w-64 lg:w-80 h-24 md:h-32 lg:h-40 flex items-center justify-center">
        <motion.img
          src={company.logo}
          alt={company.name}
          className="w-full h-full object-contain"
          style={{
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transition: 'filter 0.4s ease-in-out',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Partners() {
  const controls = useAnimation()
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate companies array multiple times for seamless infinite loop
  const duplicatedCompanies = [...companies, ...companies, ...companies]

  useEffect(() => {
    if (!isPaused) {
      const itemWidth = 400 // Increased width per item for bigger logos
      const totalWidth = companies.length * itemWidth

      controls.start({
        x: `-${totalWidth}px`,
        transition: {
          duration: companies.length * 4, // Slow: 4 seconds per partner
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }
  }, [controls, isPaused])

  const handleHover = (hovered: boolean) => {
    setIsPaused(hovered)
    if (hovered) {
      controls.stop()
    } else {
      // Resume animation
      const itemWidth = 400 // Increased width per item for bigger logos
      const totalWidth = companies.length * itemWidth

      controls.start({
        x: `-${totalWidth}px`,
        transition: {
          duration: companies.length * 4,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }
  }

  return (
    <section className="bg-white overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-0">
            Working with Industry Leaders
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scrolling carousel with fade edges */}
      <div className="relative overflow-hidden">
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex"
          animate={controls}
          initial={{ x: 0 }}
        >
          {duplicatedCompanies.map((company, index) => (
            <PartnerItem
              key={`${company.id}-${index}`}
              company={company}
              onHover={handleHover}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
