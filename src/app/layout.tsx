import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './global.css'
import NavBar from '@/components/Navbar/Navbar'
import { Sometype_Mono } from 'next/font/google'

const sometypeMono = Sometype_Mono({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  title: 'Rodrigo Santos',
  description: 'Software Engineer',
  manifest: '/manifest.json',
  verification: {
    google: 'DklI2pa9po4FGYTmMgU4V4uFQgremMx-r7yd0IXrFIY'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={sometypeMono.className}>
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
