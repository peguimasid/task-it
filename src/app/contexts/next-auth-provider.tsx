'use client';

import { SessionProvider } from 'next-auth/react';
import { FunctionComponent, PropsWithChildren } from 'react';

export const NextAuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
