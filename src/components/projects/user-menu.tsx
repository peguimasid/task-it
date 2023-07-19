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

  return (
    <>
      <Button onClick={userMenuClick} className="normal-case">
        <div className="hidden flex-col items-end md:flex">
          <Typography component="span" className="flex text-slate-50">
            {data?.user.name}
          </Typography>
        </div>

        <Avatar className="md:mx-4">{data?.user?.name?.[0]}</Avatar>
        <Icon className="text-zinc-300">{userMenu ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        classes={{
          paper: 'py-2'
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
