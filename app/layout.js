import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://ecodome.org'),
  title: {
    default: 'ECODOME — Protecting Mangroves. Preserving Shark Nurseries. Powering Youth Action.',
    template: '%s · ECODOME',
  },
  description: 'A youth-led global platform combining conservation research, climate awareness, and marine ecosystem protection. Mangroves, shark nurseries, marine biodiversity.',
  keywords: ['mangrove conservation','shark nursery protection','marine biodiversity','climate awareness','youth environmental movement','blue carbon','coastal ecosystems','marine research'],
  authors: [{ name: 'ECODOME' }],
  openGraph: {
    title: 'ECODOME — A Global Youth Movement for Mangroves & Marine Life',
    description: 'Conservation research, climate awareness, and marine ecosystem protection — driven by youth, for the planet.',
    type: 'website',
    siteName: 'ECODOME',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECODOME',
    description: 'A youth-led global platform for marine conservation research.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  themeColor: '#0B3D2E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="font-sans antialiased bg-[#FAFAF7] text-[#0B1F18] selection:bg-[#0E7490]/20 selection:text-[#0B3D2E]">
        {children}
        <Toaster position="bottom-right" theme="light" richColors />
      </body>
    </html>
  )
}
