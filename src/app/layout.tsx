import '../styles/globals.css';

import { FunctionComponent, PropsWithChildren } from 'react';
import { Metadata } from 'next';

import { NextAuthProvider } from './contexts/next-auth-provider';

import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task-it | Home',
  description: 'Simplify Project Management and Task Collaboration',
  icons: [{ rel: 'icon', url: 'favicon.svg' }]
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={twMerge('bg-black text-slate-50', inter.className)}>{children}</body>
      </NextAuthProvider>
    </html>
  );
};

export default Layout;
