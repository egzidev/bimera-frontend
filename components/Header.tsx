'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
] as const

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
                            <img
                                src="/images/logo.png"
                                alt="Bimera Logo"
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

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-white/20 bg-white/70 backdrop-blur-xl">
                        <div className="px-4 py-4 space-y-3">
                            <a
                                href="#services"
                                className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Services
                            </a>
                            <a
                                href="#work"
                                className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Projects
                            </a>
                            <a
                                href="#about"
                                className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </a>
                            <a
                                href="#contact"
                                className="block text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
