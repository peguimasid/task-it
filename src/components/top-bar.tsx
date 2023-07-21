import { FunctionComponent } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

interface TopBarProps {
  userActions?: FunctionComponent | null;
}

export const TopBar: FunctionComponent<TopBarProps> = ({ userActions: UserActions = null }) => {
  return (
    <header className="sticky inset-0 z-10 flex h-24 w-full border-b border-gray-600 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-row items-center px-5 py-4">
        <Link href="/" className="flex flex-row items-center justify-center space-x-2 py-2">
          <Image width={90} height={90} src="/favicon.svg" alt="Task-it logo" className="h-auto w-8" />
          <h1 className={twMerge('text-xl font-extrabold', ubuntu.className)}>Task-it</h1>
        </Link>
        <div className="ml-auto flex flex-row space-x-4">{UserActions && <UserActions />}</div>
      </div>
    </header>
  );
};
