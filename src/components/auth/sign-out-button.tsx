'use client';

import { signOut } from 'next-auth/react';
import { FunctionComponent, useCallback } from 'react';

export const SignOutButton: FunctionComponent = () => {
  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <button onClick={handleSignOut} className="rounded-lg bg-primary px-4 py-2">
      Sign Out
    </button>
  );
};
