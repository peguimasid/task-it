'use client';

import { Fragment } from 'react';

import Image from 'next/image';

import { signOut, useSession } from 'next-auth/react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';

export const UserMenu = () => {
  const { data } = useSession();

  if (!data) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center space-x-3 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-inset transition-all hover:bg-zinc-900">
          {data.user.image ? (
            <Image
              width={90}
              height={90}
              src={data.user.image}
              alt={data.user.name ?? ''}
              className="h-auto w-8 rounded-full"
            />
          ) : (
            <h1 className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900">
              {data.user.name?.[0] ?? ''}
            </h1>
          )}
          <p>{data.user.name}</p>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="button"
              onClick={() => signOut()}
              className="inline-flex w-full items-center space-x-2 px-4 py-2 text-left text-sm hover:bg-zinc-900 hover:text-zinc-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <p>Sign out</p>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
