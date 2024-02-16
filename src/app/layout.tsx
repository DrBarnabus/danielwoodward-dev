import '~/styles/global.scss';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cx } from 'class-variance-authority';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next/types';
import { Footer } from '~/components/footer';
import { Header } from '~/components/header';
import { ClientLayout } from './client-layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const title = '<DanielWoodward />';
const titleTemplate = '%s | <DanielWoodward />';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: title,
    template: titleTemplate,
  },
  description: 'My personal website and tech blog',
  applicationName: '<DanielWoodward />',
  category: 'technology',
  keywords: ['NextJS', 'React', 'Blog', 'dotnet', 'C#'],
  authors: [{ name: 'Daniel Woodward', url: 'https://danielwoodward.dev' }],
  creator: 'Daniel Woodward',
  publisher: 'Daniel Woodward',
  icons: {
    icon: [
      { url: '/assets/icon-512x512.png', sizes: '512x512' },
      { url: '/assets/icon-256x256.png', sizes: '256x256' },
      { url: '/assets/icon-144x144.png', sizes: '144x144' },
      { url: '/assets/icon-96x96.png', sizes: '96x96' },
    ],
  },
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
  },
  twitter: {
    title: {
      default: title,
      template: titleTemplate,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E93554' },
    { media: '(prefers-color-scheme: dark)', color: '#DF3B57' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(inter.variable, 'antialiased')}>
      <body className="grid min-h-screen grid-cols-1 grid-rows-layout bg-zinc-50 dark:bg-zinc-900 sm:grid-cols-layout">
        <ClientLayout>
          <header className="sticky top-0 z-50 col-span-3 row-span-1 row-start-1">
            <Header />
          </header>
          <main className="col-span-1 row-start-2 sm:col-start-2">{children}</main>
          <footer className="col-span-3 row-span-1 row-start-3">
            <Footer />
          </footer>

          <Analytics />
          <SpeedInsights />
        </ClientLayout>
      </body>
    </html>
  );
}
