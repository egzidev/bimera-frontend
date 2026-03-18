import type { Locale } from './locales'
import { defaultLocale } from './locales'

type AnyMessages = Record<string, unknown>

function getByPath(obj: AnyMessages, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export function getMessageValue(messagesByLocale: Record<Locale, AnyMessages>, locale: Locale, key: string) {
  const value = getByPath(messagesByLocale[locale], key)
  if (typeof value === 'string') return value

  const fallback = getByPath(messagesByLocale[defaultLocale], key)
  return typeof fallback === 'string' ? fallback : key
}

