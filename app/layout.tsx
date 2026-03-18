import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/components/i18n/LocaleProvider'
import { defaultLocale } from '@/lib/i18n/locales'

const inter = Inter({ subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
 })

export const metadata: Metadata = {
  title: 'Bimera - Smart Structural Design',
  description: 'Smart structural design for efficient and buildable projects. Structural engineering consultancy headquartered in Sweden.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={defaultLocale}>
      <body className={inter.className}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
