import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/ui/footer';
import { Header } from '@/components/ui/header';
import { NavigationEvents } from "@/components/ui/navigation-events";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paul Rudd Concreting",
  description: "Best Concreter in Orange.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ]
  },
  manifest: '/site.webmanifest',
  // OpenGraph metadata for social media and search engines
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://paulruddconcreting.com.au', // Replace with your actual domain
    title: 'Paul Rudd Concreting',
    description: 'Best Concreter in Orange.',
    siteName: 'Paul Rudd Concreting',
    images: [
      {
        url: '/favicon-512x512.png', // Using the largest favicon as OG image
        width: 512,
        height: 512,
        alt: 'Paul Rudd Concreting Logo',
      }
    ],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="orange-concrete-theme">
          <Header />
          <NavigationEvents />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
