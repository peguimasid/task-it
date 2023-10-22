'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export const NextAuthProvider = ({ children, ...props }: SessionProviderProps) => {
  return <SessionProvider {...props}>{children}</SessionProvider>;
};
