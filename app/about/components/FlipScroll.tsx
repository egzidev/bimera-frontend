'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll mapping: no hold at box 2 so you can reach box 3; even spread across scroll
const P1_END = 0.32       // end of path 1 (arrive at box 2)
const P2_END = 0.72      // end of path 2 (arrive at box 3)
// p in [0, P1_END]: path 1; [P1_END, P2_END]: path 2; [P2_END, 1]: path 3

function getSegmentProgress(p: number) {
  let seg1: number, seg2: number, seg3: number
  if (p <= P1_END) {
    seg1 = p / P1_END
    seg2 = 0
    seg3 = 0
  } else if (p <= P2_END) {
    seg1 = 1
    seg2 = (p - P1_END) / (P2_END - P1_END)
    seg3 = 0
  } else {
    seg1 = 1
    seg2 = 1
    seg3 = (p - P2_END) / (1 - P2_END)
  }
  return { seg1, seg2, seg3 }
}

const IMAGES = [
  '/images/about-us/1.png',
  '/images/about-us/2.png',
  '/images/about-us/3.png',
]

type FlipScrollProps = {
  embedded?: boolean
  triggerRef?: RefObject<HTMLElement | null>
}

export default function FlipScroll({ embedded, triggerRef }: FlipScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const secondMarkerRef = useRef<HTMLDivElement>(null)
  const thirdMarkerRef = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pathLengths, setPathLengths] = useState<[number, number, number]>([0, 0, 0])
  const pathLengthsRef = useRef<[number, number, number]>([0, 0, 0])
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const path3Ref = useRef<SVGPathElement>(null)
  const [headPosition, setHeadPosition] = useState({ x: 86, y: 14 })
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mainRef.current || !boxRef.current || !secondMarkerRef.current || !thirdMarkerRef.current) return
    if (!embedded && !finalRef.current) return

    const createScrollTrigger = () => {
      const triggerEl = embedded ? mainRef.current : sectionRef.current
      const endTriggerEl = embedded ? mainRef.current : finalRef.current
      if (!triggerEl || !endTriggerEl) return

      ctxRef.current?.revert()

      const onUpdate = (self: { progress: number }) => {
        const p = self.progress
        setScrollProgress(p)
        const { seg1: s1, seg2: s2, seg3: s3 } = getSegmentProgress(p)
        // Show step card only when image has touched that box
        if (s1 < 0.98) setImageIndex(0)
        else if (s2 < 0.98) setImageIndex(1)
        else setImageIndex(2)

        // Snake head: image follows the painted line head (same progress as stroke-dash)
        const lens = pathLengthsRef.current
        const path1 = path1Ref.current
        const path2 = path2Ref.current
        const path3 = path3Ref.current

        if (s1 < 1 && path1 && lens[0] > 0) {
          const pt = path1.getPointAtLength(s1 * lens[0])
          setHeadPosition({ x: pt.x, y: pt.y })
        } else if (s2 < 1 && path2 && lens[1] > 0) {
          const pt = path2.getPointAtLength(s2 * lens[1])
          setHeadPosition({ x: pt.x, y: pt.y })
        } else if (path3 && lens[2] > 0) {
          // Step 3: image stays at box 3 (start of path 3); only the border continues to screen edge
          const pt = path3.getPointAtLength(0)
          setHeadPosition({ x: pt.x, y: pt.y })
        }
      }

      const scrollTriggerConfig = embedded
        ? { trigger: triggerEl, start: 'top center', endTrigger: endTriggerEl, end: 'bottom top+=80%', scrub: 1, onUpdate }
        : { trigger: triggerEl, start: 'top center', endTrigger: endTriggerEl, end: 'bottom center+=80%', scrub: 1, onUpdate }

      ctxRef.current = gsap.context(() => {
        if (mainRef.current) ScrollTrigger.create(scrollTriggerConfig)
      }, mainRef.current ?? undefined)
    }

    createScrollTrigger()
    window.addEventListener('resize', createScrollTrigger)
    return () => {
      window.removeEventListener('resize', createScrollTrigger)
      ctxRef.current?.revert()
    }
  }, [embedded])

  // Measure path lengths for stroke-dash animation (paint-in effect)
  useEffect(() => {
    const measure = () => {
      const l1 = path1Ref.current?.getTotalLength() ?? 0
      const l2 = path2Ref.current?.getTotalLength() ?? 0
      const l3 = path3Ref.current?.getTotalLength() ?? 0
      if (l1 || l2 || l3) {
        const lengths: [number, number, number] = [l1, l2, l3]
        setPathLengths(lengths)
        pathLengthsRef.current = lengths
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Segment progress 0..1 for each path (includes hold at box 2)
  const { seg1: segment1, seg2: segment2, seg3: segment3 } = getSegmentProgress(scrollProgress)

  const flipContent = (
    <div
      ref={mainRef}
      className={`flip-scroll-main relative overflow-hidden ${embedded ? 'absolute inset-0 h-full min-h-[420px]' : 'min-h-[800px] h-[100vh]'}`}
    >
      {/* Floating circle behind - fixed to viewport, reaches screen edges */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none"
        aria-hidden
      >
        <div
          className={`flip-scroll-orb w-[100vmax] h-[100vmax] min-w-[400px] min-h-[400px] rounded-full blur-xl opacity-50 transition-colors duration-500 ${
            imageIndex === 0
              ? 'bg-gray-300'
              : imageIndex === 1
                ? 'bg-[#006AA7]'
                : 'bg-[#002868]'
          }`}
          style={{
            animation: 'flip-orb-float 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Connecting lines between boxes - paint in as image moves, smooth color blend at junctions */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/* Green (box 1 center) → Blue (box 2 left center) along first path */}
          <linearGradient id="lineGrad1" gradientUnits="userSpaceOnUse" x1="86" y1="14" x2="17" y2="50">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          {/* Blue (box 2 left center) → Orange (box 3 center) along second path */}
          <linearGradient id="lineGrad2" gradientUnits="userSpaceOnUse" x1="17" y1="50" x2="86" y2="80">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="rgb(245, 158, 11)" />
          </linearGradient>
          {/* Orange: short tail inside box 3, centered in box width/height */}
          <linearGradient id="lineGrad3" gradientUnits="userSpaceOnUse" x1="86" y1="80" x2="87" y2="83">
            <stop offset="0%" stopColor="rgb(245, 158, 11)" />
            <stop offset="100%" stopColor="rgb(245, 158, 11)" />
          </linearGradient>
        </defs>
        {/* Box 1 center → Box 2 left center: green to blue (path starts at box 1 visual center) */}
        <path
          ref={path1Ref}
          d="M 86 14 C 50 14, 22 35, 17 50"
          fill="none"
          stroke="url(#lineGrad1)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLengths[0]}
          strokeDashoffset={pathLengths[0] * (1 - segment1)}
        />
        {/* Box 2 left center → Box 3 center: blue to orange (path ends at box 3 visual center) */}
        <path
          ref={path2Ref}
          d="M 17 50 C 17 66, 50 77, 86 80"
          fill="none"
          stroke="url(#lineGrad2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLengths[1]}
          strokeDashoffset={pathLengths[1] * (1 - segment2)}
        />
        {/* Box 3: short orange tail inside box (starts at box 3 visual center) */}
        <path
          ref={path3Ref}
          d="M 86 80 L 87 83"
          fill="none"
          stroke="url(#lineGrad3)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={pathLengths[2]}
          strokeDashoffset={pathLengths[2] * (1 - segment3)}
        />
      </svg>

      {/* Step card: positioned next to each box — Step 1 left of box 1, Step 2 right of box 2, Step 3 left of box 3 */}
      <div
        className={`absolute max-w-[220px] pointer-events-none z-10 transition-all duration-300 ${
          imageIndex === 0
            ? 'right-[calc(8%+140px+20px)] top-[7%] text-right'
            : imageIndex === 1
              ? 'left-[calc(12%+140px+20px)] top-1/2 -translate-y-1/2'
              : 'right-[calc(8%+140px+20px)] bottom-16 text-right'
        }`}
      >
        <div
          key={imageIndex}
          className={`rounded-xl border-2 bg-white/95 backdrop-blur shadow-lg px-4 py-3 transition-all duration-300 ${
            imageIndex === 0
              ? 'border-emerald-500 shadow-emerald-500/20'
              : imageIndex === 1
                ? 'border-[#2563eb] shadow-blue-500/20'
                : 'border-amber-500 shadow-amber-500/20'
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
              imageIndex === 0 ? 'text-emerald-600' : imageIndex === 1 ? 'text-[#2563eb]' : 'text-amber-600'
            }`}
          >
            {imageIndex === 0 ? 'Step 1 — Client' : imageIndex === 1 ? 'Step 2 — Sweden' : 'Step 3 — Kosovo'}
          </p>
          <p className="text-sm text-gray-700 leading-snug">
            {imageIndex === 0
              ? 'Your project starts here. We take your brief and align scope, timeline and deliverables with you.'
              : imageIndex === 1
                ? 'Client relations, contracts, project management & structural calculations in line with Swedish and EU regulations.'
                : 'Detailed drawings and BIM models using the same documented workflows and technical standards.'}
          </p>
        </div>
      </div>

      {/* Position 1: always visible, active (emerald) when image is here */}
      <div
        className={`absolute right-[8%] top-[7%] w-[140px] h-[140px] flex items-center justify-center rounded-[10px] bg-white shadow-lg shadow-gray-200/40 z-10 transition-all duration-300 border-2 ${
          imageIndex === 0 ? 'border-emerald-500' : 'border-gray-200/80'
        }`}
      >
        {imageIndex === 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Brief
          </span>
        )}
      </div>

      {/* Moving box with image - follows path head (snake style), aligned with border paint */}
      <div
        ref={boxRef}
        className="absolute w-[140px] h-[140px] flex items-center justify-center rounded-[10px] z-20 pointer-events-none"
        style={{
          left: `${headPosition.x}%`,
          top: `${headPosition.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="flip-scroll-box w-[100px] h-[100px] relative rounded-[10px] overflow-hidden bg-transparent">
          <Image
            src={IMAGES[imageIndex]}
            alt=""
            fill
            className="object-contain"
            sizes="100px"
          />
        </div>
      </div>

      {/* Position 2: left side, vertically centered; active (blue) when image is here */}
      <div
        className={`absolute left-[12%] top-1/2 -translate-y-1/2 w-[140px] h-[140px] flex items-center justify-center rounded-[10px] bg-white shadow-lg shadow-gray-200/40 z-10 transition-all duration-300 border-2 ${
          imageIndex === 1 ? 'border-[#2563eb]' : 'border-gray-200/80'
        }`}
      >
        <div
          ref={secondMarkerRef}
          className="w-[100px] h-[100px] rounded-[10px] border border-transparent"
          aria-hidden
        />
        {imageIndex === 1 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center gap-1 rounded-full bg-[#2563eb] px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Lead
          </span>
        )}
      </div>

      {/* Position 3: same vertical line as box 1 (right 8%), active (amber) when image is here */}
      <div
        className={`absolute right-[8%] bottom-16 w-[140px] h-[140px] flex items-center justify-center rounded-[10px] bg-white shadow-lg shadow-gray-200/40 z-10 transition-all duration-300 border-2 ${
          imageIndex === 2 ? 'border-amber-500' : 'border-gray-200/80'
        }`}
      >
        <div
          ref={thirdMarkerRef}
          className="w-[100px] h-[100px] rounded-[10px] border border-transparent"
          aria-hidden
        />
        {imageIndex === 2 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Delivery
          </span>
        )}
      </div>
    </div>
  )

  if (embedded) {
    return flipContent
  }

  return (
    <>
      <div ref={sectionRef} className="flip-scroll-spacer min-h-[20vh] flex items-center justify-center text-gray-500 text-sm">
        scroll down
      </div>
      {flipContent}
      <div ref={finalRef} className="flip-scroll-spacer min-h-[20vh]" />
    </>
  )
}
