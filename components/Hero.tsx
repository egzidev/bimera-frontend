'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

const GLASS_R = 70

const heroLines = ['Smart structural design', 'for efficient and', 'buildable projects']
const heroLinesSv = ['Smart strukturell design', 'för effektivt och', 'byggbara projekt']

export default function Hero() {
  const [heroRevealed, setHeroRevealed] = useState(false)
  const [glass, setGlass] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = titleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setGlass({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        w: rect.width,
        h: rect.height,
      })
    },
    []
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  const wordVariants = {
    hidden: { filter: 'blur(14px)', opacity: 0.5 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  }

  let wordIndex = 0

  return (
    <motion.section
      className="relative pt-16 pb-10 bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setHeroRevealed(true)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Video Section with Title Overlay */}
        <motion.div
          className="mb-16 w-full mt-10"
          initial="hidden"
          animate={heroRevealed ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="relative w-full flex lg:block h-[600px]  aspect-video rounded-xl overflow-hidden bg-gray-100 z-10"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover order-2 lg:order-1"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Title Overlay at Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 order-1 lg:order-2 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 md:p-12"
              variants={titleVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                ref={titleRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setGlass(null)}
                className="relative cursor-default"
              >
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight"
                >
                  {heroLines.map((line, lineIndex) => (
                    <span key={lineIndex} className="block">
                      {line.split(' ').map((word, i) => {
                        const index = wordIndex++
                        return (
                          <motion.span
                            key={`${lineIndex}-${i}`}
                            className="inline-block mr-[0.25em]"
                            initial="hidden"
                            animate={heroRevealed ? 'visible' : 'hidden'}
                            variants={wordVariants}
                            transition={{
                              duration: 1,
                              delay: index * 0.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {word}
                          </motion.span>
                        )
                      })}
                    </span>
                  ))}
                </motion.h1>

                {/* Mouse-following glass: Swedish inside lens — clean circle, same glass as elsewhere */}
                {glass && heroRevealed && (
                  <div
                    className="hero-glass-lens absolute overflow-hidden rounded-full pointer-events-none border border-white/35 bg-white/20 shadow-xl"
                    style={{
                      width: GLASS_R * 2,
                      height: GLASS_R * 2,
                      left: glass.x - GLASS_R,
                      top: glass.y - GLASS_R,
                    }}
                  >
                    <div
                      className="absolute transition-transform duration-200 ease-out"
                      style={{
                        left: GLASS_R - glass.x,
                        top: GLASS_R - glass.y,
                        width: glass.w,
                        height: glass.h,
                        transform: 'scale(1.28)',
                        transformOrigin: `${glass.x}px ${glass.y}px`,
                      }}
                    >
                      <div className="hero-glass-deform">
                        <h1
                          className="hero-glass-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight tracking-tight"
                          aria-hidden
                        >
                        {heroLinesSv.map((line, lineIndex) => (
                          <span key={lineIndex} className="block">
                            {line.split(' ').map((word, i) => (
                              <span
                                key={`${lineIndex}-${i}`}
                                className="inline-block mr-[0.25em] hero-chromatic"
                              >
                                {word}
                              </span>
                            ))}
                          </span>
                        ))}
                        </h1>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
