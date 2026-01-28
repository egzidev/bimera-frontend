'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
  })

  const waveY = useTransform(scrollYProgress, [0, 0.4, 1], [24, 0, -12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [0.7, 1])

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="footer relative bg-gray-900 text-white pt-0 pb-6 overflow-hidden"
    >
      {/* Simple top curve – parallax on scroll */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-12 sm:h-16 pointer-events-none bg-gray-900 rounded-b-[2rem]"
        style={{ y: waveY }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 pt-14 sm:pt-16">
          <div className="flex items-center gap-3">
            <a href="/" className="shrink-0">
              <img
                src="/images/logo.png"
                alt="Bimera"
                className="h-7 w-auto opacity-90"
              />
            </a>
            <span className="text-gray-400 text-sm hidden sm:inline">
              Smart structural design for efficient and buildable projects.
            </span>
          </div>
          <div className="text-gray-400 text-sm space-y-0.5 sm:text-right">
            <p>Bimera AB · Vindfällegatan 39, 451 73 Uddevalla</p>
            <p>
              <a href="tel:+46706403529" className="hover:text-white transition-colors">
                +46 70 640 35 29
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 pt-4 border-t border-gray-800 text-gray-500 text-xs sm:text-sm">
          <nav className="flex gap-4">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Projects</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <p>© 2026 Bimera. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  )
}
