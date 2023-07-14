'use client';

import { useState } from 'react';
import Image from 'next/image';

import { signOut, useSession } from 'next-auth/react';

import { ExitIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const UserMenu = () => {
  const { data } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="z-40">
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger asChild>
          <div className="flex cursor-pointer flex-row items-center justify-center space-x-2 rounded-lg p-1 pl-2 transition-all sm:hover:bg-zinc-900">
            <h1 className="hidden sm:flex">{data?.user.name}</h1>
            <div className="flex items-center justify-center">
              {data?.user.image ? (
                <Image
                  width={80}
                  height={80}
                  src={data.user.image}
                  alt="User profile image"
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                  <p>{data?.user.name?.[0]}</p>
                </div>
              )}
            </div>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={5}
            className="z-10 flex w-44 flex-col items-start rounded-lg bg-zinc-900 p-1.5 shadow-md"
          >
            <button
              className="flex w-full items-center justify-between rounded-md px-3 py-1.5 transition-all hover:bg-zinc-800"
              onClick={() => signOut()}
            >
              <p>Sign Out</p>
              <ExitIcon className="scale-110" />
            </button>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
