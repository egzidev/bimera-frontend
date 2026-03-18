'use client'

import { useMemo } from 'react'
import { messages } from '@/lib/i18n/messages'
import { useLocale } from './LocaleProvider'
import { getMessageValue } from '@/lib/i18n/getMessage'

export function useT() {
  const { locale } = useLocale()

  return useMemo(() => {
    return (key: string) => getMessageValue(messages, locale, key)
  }, [locale])
}

