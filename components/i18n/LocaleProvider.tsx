'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Locale } from '@/lib/i18n/locales'
import { defaultLocale } from '@/lib/i18n/locales'
import { locales } from '@/lib/i18n/locales'

type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale

  const url = new URL(window.location.href)
  const queryLang = url.searchParams.get('lang')
  if (queryLang === 'en' || queryLang === 'sv') return queryLang

  const stored = window.localStorage.getItem('bimera_locale')
  if (stored === 'en' || stored === 'sv') return stored

  const browserLang = window.navigator.language?.toLowerCase() ?? ''
  if (browserLang.startsWith('sv')) return 'sv'

  return defaultLocale
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    setLocaleState(readInitialLocale())
  }, [])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem('bimera_locale', next)
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}

export function isSupportedLocale(x: string): x is Locale {
  return locales.includes(x as Locale)
}

