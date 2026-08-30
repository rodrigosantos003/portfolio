import { Inter, Fira_Code } from "next/font/google";
import AnalyticsGate from "@/components/Consent/AnalyticsGate";
import ConsentBanner from "@/components/Consent/ConsentBanner";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const firaCode = Fira_Code({
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
      className={`${inter.variable} ${firaCode.variable}`}
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

      <body className={inter.className}>
        {children}
        <ConsentBanner />
        <AnalyticsGate />
      </body>
    </html>
  );
}
