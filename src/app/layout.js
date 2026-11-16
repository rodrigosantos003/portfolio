import { Geist, Geist_Mono } from "next/font/google";
import { ReactLenis } from "lenis/react";
import AnalyticsGate from "@/components/consent/gate";
import ConsentBanner from "@/components/consent/index";
import "./global.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  preload: true,
});

export const metadata = {
  title: "Rodrigo Santos - Software Engineer",
  description: "Portfolio of Rodrigo Santos, a Software Engineer",
  manifest: "/manifest.json",
  verification: {
    google: "lpoPbATXK4nd5QA_fNmVcy840M0Lzc14L1k_nBLHn0I",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rodrigo-santos.pt/" />
        <meta
          property="og:title"
          content="Rodrigo Santos - Software Engineer"
        />
        <meta
          property="og:description"
          content="Portfolio of Rodrigo Santos, a Software Engineer"
        />
        <meta
          property="og:image"
          content="https://rodrigo-santos.pt/Rodrigo_Santos_LinkedIn.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rodrigo-santos.pt/" />
        <meta
          property="twitter:title"
          content="Rodrigo Santos - Software Engineer"
        />
        <meta
          property="twitter:description"
          content="Portfolio of Rodrigo Santos, a Software Engineer"
        />
        <meta
          property="twitter:image"
          content="https://rodrigo-santos.pt/Rodrigo_Santos_LinkedIn.png"
        />
      </head>

      <body className={geist.className}>
        <ReactLenis root>{children}</ReactLenis>
        <ConsentBanner />
        <AnalyticsGate />
      </body>
    </html>
  );
}
