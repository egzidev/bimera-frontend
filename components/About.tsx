'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'

// Animated Number Component using MotionValue
function AnimatedNumber({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayNumber, setDisplayNumber] = useState(0)

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (decimals > 0) {
        setDisplayNumber(parseFloat(latest.toFixed(decimals)))
      } else {
        setDisplayNumber(Math.floor(latest))
      }
    })

    return () => unsubscribe()
  }, [springValue, decimals])

  const formattedValue = decimals > 0
    ? displayNumber.toFixed(decimals)
    : displayNumber.toLocaleString()

  return (
    <span ref={ref}>
      {formattedValue}{suffix}
    </span>
  )
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageReveal, setImageReveal] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about')
      if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setIsVisible(true)
        }
        // Image reveal: start earlier as you scroll toward the Who We Are card, full reveal when section is ~55% up
        const revealStart = windowHeight + 120
        const revealEnd = windowHeight * 0.55
        const span = revealStart - revealEnd
        if (rect.top < revealStart && rect.bottom > 0) {
          const scrollProgress = Math.min(
            Math.max((revealStart - rect.top) / span, 0),
            1
          )
          setImageReveal(scrollProgress)
        } else if (rect.bottom <= 0) {
          setImageReveal(0)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      setMousePosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Card - Dark Blue with Quality Stats */}
          <div className="z-10 bg-[#004AAD] rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col justify-between shadow-2xl">
            {/* Quality Promise Text */}
            <div className="text-white mb-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                Quality is our promise, therefore we are transparent about meeting quality standards
              </p>
            </div>

            {/* Stats at bottom */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-auto pt-6 border-t border-blue-400/30">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {statsInView && (
                    <AnimatedNumber value={3019} suffix=" h" />
                  )}
                  {!statsInView && <span>0 h</span>}
                </div>
                <div className="text-sm md:text-base text-blue-200 font-medium">Hours worked this year</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {statsInView && (
                    <AnimatedNumber value={0.2} suffix="%" decimals={1} />
                  )}
                  {!statsInView && <span>0.0%</span>}
                </div>
                <div className="text-sm md:text-base text-blue-200 font-medium">Deviation Index</div>
              </div>
            </div>
          </div>

          {/* Right Card - Who We Are - Glassy + blurry noise circle behind image */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-2xl z-10 overflow-hidden shadow-2xl group border border-white/50 bg-white/40 backdrop-blur-2xl"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Animated mesh gradient background (softened for glass) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-gray-100/60 to-blue-50/80"></div>
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

            {/* Content Container */}
            <div className="relative z-10 p-6 md:p-8 lg:p-10 min-h-[340px] flex flex-col">
              {/* Text Content - Staggered Animation */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div
                    className={`inline-block mb-4 transition-all duration-1000 ${isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                      }`}
                    style={{ transitionDelay: '100ms' }}
                  >
                    <span className="text-sm md:text-base font-semibold text-blue-600 uppercase tracking-wider">
                      About Us
                    </span>
                  </div>

                  <h2
                    className={`text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight transition-all duration-1000 ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                      }`}
                    style={{
                      transitionDelay: '200ms',
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Who We Are
                  </h2>

                  <p
                    className={`text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-lg transition-all duration-1000 ${isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                      }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    We are a structural engineering consultancy headquarterd in Sweden.
                  </p>
                </div>

                {/* Button with magnetic effect */}
                <div
                  className={`transition-all duration-1000 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-600 hover:text-blue-600"
                    style={{
                      transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    <span className="relative z-10 flex items-center group-hover/btn:opacity-0 transition-opacity duration-300">
                      Learn More
                      <svg
                        className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white group-hover/btn:opacity-100 opacity-0 transition-opacity duration-300 z-20">
                      Learn More
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              {/* Blurry super noise circle — behind the image */}
              <div
                className="absolute bottom-0 right-0 w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full blur-3xl pointer-events-none z-0 opacity-70"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                  backgroundSize: '200px 200px',
                  backgroundRepeat: 'repeat',
                  backgroundBlendMode: 'overlay',
                  backgroundColor: 'rgba(0,74,173,0.12)',
                  transform: 'translate(15%, 15%)',
                }}
              />

              {/* Blurred duplicate of team image — behind, same effect as Testimonials */}
              <div className="absolute -bottom-12 -right-20 w-[380px] h-[380px] md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full overflow-hidden opacity-30 blur-lg pointer-events-none z-0">
                <img
                  src="/images/team.png"
                  alt=""
                  className="w-full h-full object-cover scale-150"
                />
              </div>

              {/* Team Image - Smooth Fade Reveal Animation */}
              <div
                ref={imageRef}
                className="absolute bottom-[-30px] right-[-80px] w-72 md:w-80 lg:w-[500px] h-auto pointer-events-none overflow-hidden z-10"
                style={{
                  transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px) rotate(${mousePosition.x * 0.1}deg)`,
                  transitionProperty: 'transform',
                  transitionDuration: '0.1s',
                  transitionTimingFunction: 'ease-out'
                }}
              >
                <div
                  style={{
                    maskImage: `linear-gradient(to right, transparent 0%, transparent ${Math.max(0, (1 - imageReveal) * 100 - 10)}%, black ${(1 - imageReveal) * 100}%, black 100%)`,
                    WebkitMaskImage: `linear-gradient(to right, transparent 0%, transparent ${Math.max(0, (1 - imageReveal) * 100 - 10)}%, black ${(1 - imageReveal) * 100}%, black 100%)`,
                    transition: 'mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-mask-image 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: imageReveal,
                    transitionProperty: 'mask-image, -webkit-mask-image, opacity',
                    transitionDuration: '0.3s, 0.3s, 0.5s',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <img
                    src="/images/team.png"
                    alt="Bimera Team"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Decorative border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200/50 rounded-2xl transition-all duration-500 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
