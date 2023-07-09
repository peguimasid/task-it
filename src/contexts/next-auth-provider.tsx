'use client';

import { FunctionComponent, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

export const NextAuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
