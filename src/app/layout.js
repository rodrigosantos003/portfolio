import { Sometype_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"
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

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rodrigosantos.vercel.app/" />
        <meta property="og:title" content="Rodrigo Santos - Software Engineer" />
        <meta property="og:description" content="Portfolio of Rodrigo Santos, a software engineer" />
        <meta property="og:image" content="https://rodrigosantos.vercel.app/Rodrigo_Santos_LinkedIn.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rodrigosantos.vercel.app/" />
        <meta property="twitter:title" content="Rodrigo Santos - Software Engineer" />
        <meta property="twitter:description" content="Portfolio of Rodrigo Santos, a software engineer" />
        <meta property="twitter:image" content="https://rodrigosantos.vercel.app/Rodrigo_Santos_LinkedIn.png" />
      </head>

      <body className={sometypeMono.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
