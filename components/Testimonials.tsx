'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const testimonial = {
  quote: 'This project is an industrial building for which we designed the floor system',
  author: 'Filan Fisteku',
  role: 'CEO at Prodesign AB',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', // You can add a profile image here
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const testimonialCardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax scroll for question
  const { scrollYProgress: questionScroll } = useScroll({
    target: questionRef,
    offset: ["start end", "end start"]
  })
  const questionY = useTransform(questionScroll, [0, 1], [50, -50])
  const questionOpacity = useTransform(questionScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Parallax scroll for card
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  const cardY = useTransform(cardScroll, [0, 1], [-50, 50])
  const cardOpacity = useTransform(cardScroll, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const cardScale = useTransform(cardScroll, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])

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
    <section ref={sectionRef} className="pb-20 md:pb-32 pt-10 md:pt-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight"
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
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 md:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-gray-200/50 group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
                transition: 'transform 0.1s ease-out'
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

              {/* Large blurred background image */}
              {testimonial.image && (
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full overflow-hidden opacity-30 blur-lg pointer-events-none">
                  <img
                    src={testimonial.image}
                    alt=""
                    className="w-full h-full object-cover scale-150"
                  />
                </div>
              )}

              {/* Circular profile image - top right corner, extending beyond edges */}
              {testimonial.image && (
                <div className="absolute -top-8 -right-8 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl z-10">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-10" />

              {/* Card Content */}
              <div className="relative z-20">
                {/* Name */}
                <h3 className="font-semibold text-gray-900 text-xl md:text-2xl mb-1">
                  {testimonial.author}
                </h3>

                {/* Role/Company */}
                <p className="text-gray-600 text-sm md:text-base italic mb-8">
                  {testimonial.role}
                </p>

                {/* Quote with max-width for readability */}
                <p className="text-gray-900 text-lg md:text-xl leading-relaxed max-w-sm">
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
