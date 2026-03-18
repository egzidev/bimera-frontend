'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale } from './LocaleProvider'
import { locales, type Locale } from '@/lib/i18n/locales'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const flags: Record<Locale, string> = useMemo(
    () => ({
      en: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cdefs%3E%3CclipPath id='a'%3E %3Cpath fill='%23fff' d='M0 0h24v24H0z' /%3E %3C/clipPath%3E%3C/defs%3E%3Cg fill='none'%3E%3Cg clip-path='url(%23a)'%3E %3Cpath fill='%23F0F0F0' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z' /%3E %3Cpath fill='%230052B4' d='M2.48 4.693A11.956 11.956 0 0 0 .415 8.868h6.242L2.481 4.693Zm21.107 4.176a11.957 11.957 0 0 0-2.067-4.176L17.345 8.87h6.242ZM.414 15.13a11.958 11.958 0 0 0 2.067 4.176l4.175-4.176H.414ZM19.306 2.48A11.957 11.957 0 0 0 15.13.413v6.242l4.176-4.175ZM4.694 21.518a11.957 11.957 0 0 0 4.175 2.067v-6.243l-4.175 4.176ZM8.87.413A11.957 11.957 0 0 0 4.693 2.48l4.175 4.175V.413Zm6.26 23.172a11.96 11.96 0 0 0 4.176-2.067l-4.176-4.176v6.243Zm2.215-8.455 4.175 4.176a11.957 11.957 0 0 0 2.067-4.176h-6.242Z' /%3E %3Cpath fill='%23D80027' d='M23.898 10.435H13.565V.102a12.118 12.118 0 0 0-3.13 0v10.333H.102a12.118 12.118 0 0 0 0 3.13h10.333v10.333a12.117 12.117 0 0 0 3.13 0V13.565h10.333a12.117 12.117 0 0 0 0-3.13Z' /%3E %3Cpath fill='%23D80027' d='m15.13 15.131 5.355 5.355c.247-.246.481-.503.706-.77l-4.585-4.585H15.13Zm-6.26 0-5.355 5.355c.246.246.503.481.77.706l4.585-4.585V15.13Zm0-6.261v-.001L3.513 3.514c-.246.246-.48.504-.705.77L7.394 8.87h1.475Zm6.26 0 5.355-5.355a11.996 11.996 0 0 0-.77-.705L15.13 7.395V8.87Z' /%3E %3C/g%3E%3C/g%3E%3C/svg%3E`,
      sv: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cdefs%3E%3CclipPath id='a'%3E %3Cpath fill='%23fff' d='M0 0h24v24H0z' /%3E %3C/clipPath%3E%3C/defs%3E%3Cg fill='none'%3E%3Cg clip-path='url(%23a)'%3E %3Cpath fill='%23FFDA44' d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z' /%3E %3Cpath fill='%230052B4' d='M9.391 10.435h14.507C23.131 4.547 18.097 0 12 0c-.896 0-1.769.099-2.609.285v10.15Zm-3.131 0V1.459a12.007 12.007 0 0 0-6.158 8.976H6.26Zm0 3.13H.103a12.007 12.007 0 0 0 6.159 8.976v-8.976Zm3.131.001v10.149c.84.186 1.713.285 2.609.285 6.097 0 11.131-4.547 11.898-10.435H9.391Z' /%3E %3C/g%3E%3C/g%3E%3C/svg%3E`,
    }),
    []
  )

  const languageLabel = (l: Locale) => {
    switch (l) {
      case 'sv':
        return 'Svenska'
      case 'en':
      default:
        return 'English'
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      if (e.target instanceof Node && el.contains(e.target)) return
      setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isOpen])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-gray-200 bg-white/70 hover:bg-white transition-colors"
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* Globe icon */}
        <svg
          className="w-4 h-4 text-gray-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{locale === 'sv' ? 'SV' : 'EN'}</span>
        {/* caret */}
        <svg className="w-4 h-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.06 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-2 w-44 rounded-2xl border border-gray-200/70 bg-white/90 backdrop-blur-xl shadow-lg overflow-hidden z-[80] p-1"
        >
          {locales.map((l: Locale) => {
            const isSelected = l === locale
            return (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLocale(l)
                  setIsOpen(false)
                }}
                className={[
                  'w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors flex items-center justify-between gap-3 rounded-xl',
                  isSelected
                    ? 'bg-[#004aad]/12 text-[#004aad]'
                    : 'bg-transparent text-gray-800 hover:text-[#004aad] hover:bg-transparent',
                ].join(' ')}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <Image
                    src={flags[l]}
                    alt=""
                    aria-hidden
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-sm"
                    unoptimized
                  />
                  <span className="truncate">{languageLabel(l)}</span>
                </span>
                {isSelected && (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

