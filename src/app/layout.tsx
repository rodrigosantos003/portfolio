import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import './global.css'
import NavBar from '@/components/Navbar/Navbar'

export const metadata: Metadata = {
  title: 'Rodrigo Santos',
  description: 'Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
