'use client';

import '../styles/globals.css';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { Toaster } from '@/components/ui/toaster';

import { queryClient } from '@/services/queryClient';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
          <body className={inter.className}>
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
