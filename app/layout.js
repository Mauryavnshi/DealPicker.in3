import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import SiteChrome from '@/components/layout/SiteChrome';

const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dealpicker.in';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DealPicker — Premium Amazon Tech Deals in India',
    template: '%s · DealPicker',
  },
  description:
    'Hand-picked Amazon deals on mobiles, laptops, earbuds, TVs and more. Honest reviews, verified affiliate links, and real prices — updated daily.',
  keywords: [
    'amazon deals india', 'tech deals india', 'mobile deals', 'laptop deals',
    'earbuds deals', 'best amazon deals', 'dealpicker', 'affiliate deals',
    'buying guides', 'tech reviews'
  ],
  authors: [{ name: 'DealPicker' }],
  creator: 'DealPicker',
  publisher: 'DealPicker',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'DealPicker',
    title: 'DealPicker — Premium Amazon Tech Deals in India',
    description: 'Hand-picked Amazon deals on mobiles, laptops, earbuds, TVs and more. Honest reviews, verified affiliate links, real prices.',
    images: [{ url: '/logo-dark.png', width: 1200, height: 630, alt: 'DealPicker' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dealpickerin',
    creator: '@dealpickerin',
    title: 'DealPicker — Premium Amazon Tech Deals in India',
    description: 'Hand-picked Amazon deals on mobiles, laptops, earbuds, TVs and more.',
    images: ['/logo-dark.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/logo-dark.png', apple: '/logo-dark.png' },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0a0a0c' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DealPicker',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-dark.png`,
    sameAs: [
      'https://www.instagram.com/dealpickerin',
      'https://x.com/dealpickerin',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={jetbrains.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <SiteChrome>{children}</SiteChrome>
            <Toaster position="top-center" richColors closeButton theme="dark" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
