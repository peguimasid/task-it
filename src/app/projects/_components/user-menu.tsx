'use client';

import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/button';

export const UserMenu = () => {
  const { data } = useSession();

  if (!data) return null;

  return <Button>GUI</Button>;
};

export default UserMenu;
