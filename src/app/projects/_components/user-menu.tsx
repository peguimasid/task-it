'use client';

import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export const UserMenu = () => {
  const { data } = useSession();

  if (!data) return null;

  return <Button onClick={() => signOut()}>GUI</Button>;
};

export default UserMenu;
