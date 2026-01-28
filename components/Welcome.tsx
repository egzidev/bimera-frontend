'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Welcome({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const isDismissingRef = useRef(false)

  const dismiss = useCallback((duration: number) => {
    if (isDismissingRef.current) return
    isDismissingRef.current = true

    gsap.to(containerRef.current, {
      opacity: 0,
      duration,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsVisible(false)
        onComplete()
      },
    })
  }, [onComplete])

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set('.welcome-halo', { opacity: 0, scale: 0.75, rotate: -18 })
    gsap.set('.welcome-noise', { opacity: 0 })
    gsap.set('.welcome-logo-back', { opacity: 0, scale: 0.98, filter: 'blur(22px)' })
    gsap.set('.welcome-logo-glow', { opacity: 0, scale: 0.92 })
    gsap.set('.welcome-logo-main', { opacity: 0, y: 18, scale: 0.94, filter: 'blur(18px)' })

    tl.to('.welcome-halo', {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1.0,
      ease: 'power3.out',
    })
      .to('.welcome-noise', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '<0.05')
      .to('.welcome-logo-back', { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, '<0.05')
      .to(
        '.welcome-logo-glow',
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
        '<0.05'
      )
      .to(
        '.welcome-logo-main',
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
        '<0.08'
      )
      .to('.welcome-halo', { rotate: 8, duration: 1.6, ease: 'sine.inOut' }, '+=0.2')
      .add(() => dismiss(0.8))

    // subtle animated noise drift
    gsap.to('.welcome-noise', {
      backgroundPosition: '240px 180px',
      duration: 3.2,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tl.kill()
    }
  }, [dismiss])


  const handleClick = () => {
    dismiss(0.6)
  }

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      id="welcome-splash"
      className="fixed inset-0 z-[100] flex items-center justify-center cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,74,173,0.08) 0%, rgba(91,143,212,0.06) 45%, rgba(232,236,242,0.1) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
        backgroundSize: 'cover, 200px 200px',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundBlendMode: 'normal, overlay',
        backgroundColor: '#ffffff',
      }}
    >
      {/* extra "primary trio" blur blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#004aad]/25 blur-3xl" />
        <div className="absolute top-[15%] -right-32 h-[520px] w-[520px] rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute -bottom-40 left-[10%] h-[560px] w-[560px] rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute bottom-[5%] right-[15%] h-[420px] w-[420px] rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      {/* super noise overlay - covers entire screen */}
      <div
        aria-hidden
        className="welcome-noise absolute inset-0 pointer-events-none mix-blend-overlay opacity-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27320%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
        }}
      />

      <div className="relative w-full max-w-2xl px-8">
        <div className="flex items-center justify-center">
          <div className="relative">

            {/* halo ring */}
            <div
              aria-hidden
              className="welcome-halo absolute -inset-10 rounded-full blur-2xl opacity-0"
              style={{
                background:
                  'conic-gradient(from 180deg, rgba(0,74,173,0.0), rgba(0,74,173,0.35), rgba(125,211,252,0.28), rgba(196,181,253,0.22), rgba(255,237,213,0.20), rgba(0,74,173,0.0))',
              }}
            />

            {/* big blurred logo behind */}
            <div
              aria-hidden
              className="welcome-logo-back absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-0"
            >
              <Image
                src="/images/logo.svg"
                alt=""
                width={900}
                height={320}
                priority
                className="w-[380px] sm:w-[580px] md:w-[720px] h-auto opacity-30"
              />
            </div>

            {/* logo glow layer */}
            <div aria-hidden className="welcome-logo-glow absolute inset-0 blur-2xl opacity-0">
              <Image
                src="/images/logo.svg"
                alt=""
                width={520}
                height={180}
                priority
                className="w-[240px] sm:w-[360px] md:w-[460px] h-auto opacity-70"
              />
            </div>

            {/* crisp logo */}
            <div
              className="welcome-logo-main relative opacity-0"
              style={{ transform: 'translateY(18px) scale(0.94)', filter: 'blur(18px)' }}
            >
              <Image
                src="/images/logo.svg"
                alt="Bimera"
                width={520}
                height={180}
                priority
                className="w-[240px] sm:w-[360px] md:w-[460px] h-auto drop-shadow-[0_26px_80px_rgba(0,0,0,0.14)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
