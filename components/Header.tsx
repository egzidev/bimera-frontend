'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
] as const

// Section ids to observe; #portfolio (mobile) counts as #work
const SECTION_IDS = ['services', 'work', 'about', 'contact'] as const

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)
    const [activeNavLink, setActiveNavLink] = useState<string>('#services')
    const expandedMenuRef = useRef<HTMLDivElement>(null)
    const menuLinksRef = useRef<HTMLAnchorElement[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Which section is in view → active nav link (#work includes #portfolio)
    const sectionVisibilityRef = useRef<Record<string, number>>({})
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id
                    sectionVisibilityRef.current[id] = entry.intersectionRatio
                })
                const entries_ = Object.entries(sectionVisibilityRef.current)
                if (entries_.length === 0) return
                const [bestId] = entries_.reduce((a, b) => (a[1] >= b[1] ? a : b))
                setActiveNavLink(bestId === 'portfolio' ? '#work' : `#${bestId}`)
            },
            { rootMargin: '-20% 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] }
        )

        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    // GSAP timeline: full viewport height + staggered link opacity
    useEffect(() => {
        const menu = expandedMenuRef.current
        const links = menuLinksRef.current.filter(Boolean)
        if (!menu || links.length === 0) return

        gsap.set(menu, { height: 0, overflow: 'hidden' })
        gsap.set(links, { opacity: 0 })

        const tl = gsap
            .timeline({ paused: true })
            .to(menu, {
                duration: 1.2,
                delay: 0.1,
                height: '100vh',
                ease: 'power4.out',
                overflow: 'hidden',
            })
            .to(
                links,
                {
                    duration: 1,
                    opacity: 1,
                    ease: 'power4.inOut',
                    stagger: 0.05,
                },
                0.3
            )

        tlRef.current = tl
        return () => {
            tl.kill()
            tlRef.current = null
        }
    }, [])

    useEffect(() => {
        const tl = tlRef.current
        if (!tl) return
        if (isMenuOpen) {
            tl.play()
        } else {
            tl.reverse()
        }
    }, [isMenuOpen])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${isScrolled
                ? 'bg-white/70 backdrop-blur-xl border-b border-white/40'
                : 'bg-white/60 backdrop-blur-lg border-b border-white/20'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo on the left — first on landing */}
                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <a
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Bimera Logo"
                                width={140}
                                height={32}
                                className="h-6 md:h-7 w-auto transition-transform duration-300 group-hover:scale-110"
                            />
                        </a>
                    </motion.div>

                    {/* Main Navigation — after logo on landing */}
                    <motion.div
                        className="hidden lg:flex lg:items-center lg:space-x-1"
                        onMouseLeave={() => setHoveredLink(null)}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {navLinks.map(({ href, label }) => {
                            const isHovered = hoveredLink === href
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className={`relative px-4 py-2 text-sm font-medium group transition-all duration-300 ${
                                        isHovered
                                            ? 'text-[#004aad] scale-110'
                                            : hoveredLink
                                                ? 'text-gray-400 opacity-80 blur-[1px]'
                                                : 'text-gray-700 hover:text-[#004aad]'
                                    }`}
                                    onMouseEnter={() => setHoveredLink(href)}
                                >
                                    {label}
                                    
                                </a>
                            )
                        })}
                    </motion.div>

                    {/* Mobile menu button — same delay as nav */}
                    <motion.div
                        className="lg:hidden"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                    <button
                        className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                    </motion.div>
                </div>

                {/* Mobile Navigation — full viewport overlay, GSAP animates height + stagger */}
                <div
                    id="expanded-menu"
                    ref={expandedMenuRef}
                    className="lg:hidden fixed top-0 left-0 right-0 z-[75] bg-white/95 backdrop-blur-2xl pl-10"
                    style={{ height: 0, overflow: 'hidden' }}
                >
                    <div className="flex flex-col justify-center min-h-full px-6 py-20 relative">
                        <button
                            type="button"
                            className="absolute top-5 right-4 p-2 text-gray-700 hover:text-gray-900 transition-colors z-10"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <nav className="space-y-6">
                            {navLinks.map(({ href, label }, index) => {
                                const isCurrent = activeNavLink === href
                                return (
                                    <a
                                        key={href}
                                        href={href}
                                        ref={(el) => {
                                            if (el) menuLinksRef.current[index] = el
                                        }}
                                        className={`menu-link block text-gray-900 font-semibold transition-all duration-300 py-3 ${
                                            isCurrent
                                                ? 'text-4xl sm:text-5xl scale-110 sm:scale-125 text-[#004aad]'
                                                : 'text-3xl sm:text-4xl blur-[2px] sm:blur-[5px] opacity-60'
                                        }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {label}
                                    </a>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </nav>
        </header>
    )
}
