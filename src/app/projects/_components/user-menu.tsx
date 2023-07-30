'use client';

import { useState, useCallback, MouseEvent } from 'react';

import { signOut, useSession } from 'next-auth/react';

export const UserMenu = () => {
  const { data } = useSession();

  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  }, []);

  const userMenuClose = useCallback(() => {
    setUserMenu(null);
  }, []);

  if (!data) return null;

  return (
    <>
      <button>ADD MENU</button>
    </>
  );
};

export default UserMenu;
