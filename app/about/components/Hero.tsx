'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85) setIsVisible(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={heroRef}
      id="about"
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden min-h-[500px] lg:min-h-[680px]"
    >
      {/* Full-width hero image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[3.5rem]">
        <Image
          src="/images/about-us/hero.png"
          alt="Bimera team"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Text overlay: absolute, left side, white card at bottom with rounded top */}
      <div className="absolute left-0 right-0 top-0 bottom-0 flex items-end px-4 sm:px-6 lg:px-8 pb-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="absolute left-4 sm:left-6 lg:left-8 bottom-0 right-4 sm:right-6 lg:right-8 flex justify-start">
            <div className="bg-white rounded-t-[4rem] lg:rounded-t-[5rem] px-6 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 max-w-xl min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] shadow-lg">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  About Us
                </span>
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight mb-6 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  Driven by ambition
                </h1>
                <p
                  className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  We are a structural engineering consultancy headquartered in Sweden, with operation offices in Kosovo.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
