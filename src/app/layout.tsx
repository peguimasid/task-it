import '../styles/globals.css';

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { NextAuthProvider } from '@/contexts/next-auth-provider';
import { ReactQueryProvider } from '@/contexts/react-query-provider';
import { ThemeProvider } from '@/contexts/theme-provider';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
  authors: [{ name: 'peguimasid', url: 'https://masid.dev' }],
  creator: 'peguimasid',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn('min-h-[100dvh] bg-background font-sans antialiased', fontSans.variable, fontHeading.variable)}
      >
        <ReactQueryProvider>
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster />
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
