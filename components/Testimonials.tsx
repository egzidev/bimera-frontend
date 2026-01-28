'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const testimonial = {
  quote: 'Bimera has extensive experience in modeling prefab frames and producing production documents for concrete and steel elements.',
  author: 'Joakim Lindskog',
  role: 'CEO, Prodesign AB',
  image: '/images/testimonials/joakim-lindskog.jpg',
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const testimonialCardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hasHover, setHasHover] = useState(true)

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  // Parallax scroll for question
  const { scrollYProgress: questionScroll } = useScroll({
    target: questionRef,
    offset: ["start end", "end start"]
  })
  const questionY = useTransform(questionScroll, [0, 1], [30, -30])
  const questionOpacity = useTransform(questionScroll, [0, 0.25, 0.75, 1], [0, 1, 1, 0])

  // Parallax scroll for card — gentler on mobile
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  const cardY = useTransform(cardScroll, [0, 1], [-30, 30])
  const cardOpacity = useTransform(cardScroll, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const cardScale = useTransform(cardScroll, [0, 0.25, 0.75, 1], [0.97, 1, 1, 0.97])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (testimonialCardRef.current) {
      const rect = testimonialCardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      setMousePosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section ref={sectionRef} className="pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-32 md:pt-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Question */}
          <motion.div
            ref={questionRef}
            className="space-y-4"
            style={{
              y: questionY,
              opacity: questionOpacity,
            }}
          >
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              What our clients and partners
              <br />
              say about us?
            </motion.h2>
          </motion.div>

          {/* Right: Testimonial Card */}
          <motion.div
            ref={cardRef}
            className="relative"
            style={{
              y: cardY,
              opacity: cardOpacity,
              scale: cardScale,
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={testimonialCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 relative overflow-hidden shadow-xl sm:shadow-2xl border border-gray-200/50 group"
              style={{
                transform: hasHover ? `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)` : 'none',
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Animated mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50"></div>
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, rgba(0, 74, 173, 0.15), transparent 50%)`
                }}
              ></div>

              {/* Animated geometric shapes */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"
                  style={{
                    top: '10%',
                    right: '10%',
                    transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                ></div>
                <div
                  className="absolute w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"
                  style={{
                    bottom: '20%',
                    left: '15%',
                    transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                ></div>
              </div>

              {/* Large blurred background image — top right, behind; smaller on mobile */}
              {testimonial.image && (
                <div className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full overflow-hidden opacity-30 blur-lg pointer-events-none z-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={testimonial.image}
                      alt=""
                      fill
                      sizes="384px"
                      className="object-cover scale-150"
                    />
                  </div>
                </div>
              )}

              {/* Circular profile image — top right corner; smaller on mobile */}
              {testimonial.image && (
                <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl z-10">
                  <div className="relative w-full h-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      sizes="(max-width: 768px) 160px, 192px"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-10" />

              {/* Card Content */}
              <div className="relative z-20">
                {/* Name */}
                <h3 className="font-semibold text-gray-900 text-lg sm:text-xl md:text-2xl mb-1">
                  {testimonial.author}
                </h3>

                {/* Role/Company */}
                <p className="text-gray-600 text-sm md:text-base italic mb-4 sm:mb-8">
                  {testimonial.role}
                </p>

                {/* Quote with max-width for readability */}
                <p className="text-gray-900 text-base sm:text-lg md:text-xl leading-relaxed max-w-sm">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
