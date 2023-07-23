'use client';

import { useState, useCallback, MouseEvent } from 'react';

import { Avatar, Button, Icon, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';

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
      <Button onClick={userMenuClick} className="rounded-md normal-case">
        <div className="hidden flex-col items-end pr-4 md:flex">
          <Typography component="span" className="flex text-slate-50">
            {data?.user.name}
          </Typography>
        </div>

        {data?.user?.image ? (
          <Avatar src={data.user.image} alt={data?.user?.name ?? ''} />
        ) : (
          <Avatar className="bg-zinc-700 text-zinc-300" />
        )}

        <Icon className="ml-2 text-zinc-300">{userMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        classes={{
          paper: 'py-2 min-w-[14rem]'
        }}
      >
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Popover>
    </>
  );
};

export default UserMenu;
