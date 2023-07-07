import '../styles/globals.css';

import { FunctionComponent, PropsWithChildren } from 'react';
import { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { NextAuthProvider } from './contexts/next-auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task-it | Home',
  description: 'Simplify Project Management and Task Collaboration',
  icons: [{ rel: 'icon', url: 'favicon.svg' }]
};

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={twMerge('bg-black text-slate-50', inter.className)}>{children}</body>
      </html>
    </NextAuthProvider>
  );
};

export default Layout;
