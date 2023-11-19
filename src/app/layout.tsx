import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './global.css';
import NavBar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'Rodrigo Santos',
  description: 'Software Engineer',
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="DklI2pa9po4FGYTmMgU4V4uFQgremMx-r7yd0IXrFIY" />

      <body>
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
