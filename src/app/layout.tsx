'use client';

import '../styles/globals.css';

import { ReactNode } from 'react';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <title>Task-it | Home</title>
            <meta name="description" content="Simplify Project Management and Task Collaboration" />
            <link rel="shortcut icon" href="favicon.svg" />
          </head>
          <body
            className={cn(
              'min-h-[100dvh] bg-background font-sans antialiased',
              fontSans.variable,
              fontHeading.variable
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
