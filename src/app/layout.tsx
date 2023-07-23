'use client';

import '../styles/globals.css';

import { FunctionComponent, PropsWithChildren } from 'react';

import { NextAuthProvider } from '@/contexts/next-auth-provider';

import { ThemeProvider } from '@mui/material';
import { darkTheme } from '@/theme';

import { twMerge } from 'tailwind-merge';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <NextAuthProvider>
      <ThemeProvider theme={darkTheme}>
        <html lang="en">
          <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <title>Task-it | Home</title>
            <meta name="description" content="Simplify Project Management and Task Collaboration" />
            <link rel="shortcut icon" href="favicon.svg" />
          </head>
          <body className={twMerge('bg-black text-slate-50', inter.className)}>{children}</body>
        </html>
      </ThemeProvider>
    </NextAuthProvider>
  );
};

export default RootLayout;
