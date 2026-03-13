import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Zawad Nafi | Software Engineer',
  description:
    'Software engineer and founder based in Edmonton. CS student at the University of Alberta, building full-stack products and running ZStudios.',
  metadataBase: new URL('https://zawadnafi.com'),
  openGraph: {
    title: 'Zawad Nafi | Software Engineer',
    description:
      'Software engineer and founder based in Edmonton. CS student at the University of Alberta, building full-stack products and running ZStudios.',
    url: 'https://zawadnafi.com',
    siteName: 'Zawad Nafi',
    images: [
      {
        url: '/images/portfolio-screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Zawad Nafi Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zawad Nafi | Software Engineer',
    description:
      'Software engineer and founder based in Edmonton. Building full-stack products and running ZStudios.',
    images: ['/images/portfolio-screenshot.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
