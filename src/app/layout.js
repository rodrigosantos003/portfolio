import { Sometype_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './global.css'

const sometypeMono = Sometype_Mono({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata = {
  title: "Rodrigo Santos - Software Engineer",
  description: "Portfolio of Rodrigo Santos, a software engineer",
  manifest: '/manifest.json',
  verification: {
    google: 'DklI2pa9po4FGYTmMgU4V4uFQgremMx-r7yd0IXrFIY'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={sometypeMono.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
