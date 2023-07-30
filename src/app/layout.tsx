'use client';

import '../styles/globals.css';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import { queryClient } from '@/services/queryClient';

import { twMerge } from 'tailwind-merge';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <html lang="en">
          <head>
            <title>Task-it | Home</title>
            <meta name="description" content="Simplify Project Management and Task Collaboration" />
            <link rel="shortcut icon" href="favicon.svg" />
          </head>
          <body className={twMerge('bg-black text-slate-50', inter.className)}>{children}</body>
        </html>
      </SessionProvider>
    </QueryClientProvider>
  );
}
