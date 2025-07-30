import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Astralyss - Transforma Tu Negocio con Tecnología de Vanguardia",
  description: "Impulsamos el crecimiento de tu marca con innovación, calidad y tecnología de vanguardia. Diseño moderno, desarrollo web optimizado y soluciones digitales de alto impacto.",
  keywords: "desarrollo web, diseño web, tecnología, innovación, marketing digital, SEO, Next.js, React, TypeScript",
  authors: [{ name: "Astralyss" }],
  creator: "Astralyss",
  publisher: "Astralyss",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.astralyss.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Astralyss - Transforma Tu Negocio con Tecnología de Vanguardia",
    description: "Impulsamos el crecimiento de tu marca con innovación, calidad y tecnología de vanguardia. Diseño moderno, desarrollo web optimizado y soluciones digitales de alto impacto.",
    url: 'https://www.astralyss.com',
    siteName: 'Astralyss',
    images: [
      {
        url: '/logo/IconAstralyss-withe.svg',
        width: 1200,
        height: 630,
        alt: 'Astralyss - Transforma Tu Negocio',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Astralyss - Transforma Tu Negocio con Tecnología de Vanguardia",
    description: "Impulsamos el crecimiento de tu marca con innovación, calidad y tecnología de vanguardia.",
    images: ['/logo/IconAstralyss-withe.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google21ac370c5d0e67b7',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/iconAstralyss.ico" />
        <link rel="apple-touch-icon" href="/iconAstralyss.ico" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <JsonLd />
      </head>
      <body
        className={`${roboto.variable} ${openSans.variable} antialiased bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-sm`}
      >
        {children}
      </body>
    </html>
  );
}
