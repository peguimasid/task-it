import { FunctionComponent } from 'react';
import { Ubuntu } from 'next/font/google';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { cn } from '@/lib/utils';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

interface TopBarProps {
  userActions?: FunctionComponent | null;
}

export const TopBar: FunctionComponent<TopBarProps> = ({ userActions: UserActions = null }) => {
  return (
    <header className="sticky inset-0 z-10 flex h-20 w-full border-b border-muted backdrop-blur-md">
      <div className="container mx-auto flex w-full flex-row items-center px-5 py-4">
        <Link as="/" href="/" className="flex flex-row items-center justify-center gap-1 py-2">
          <CheckSquare className="h-6 w-6" />
          <h1 className={cn('text-xl font-extrabold', ubuntu.className)}>Task-it</h1>
        </Link>
        <div className="ml-auto flex flex-row space-x-4">{UserActions && <UserActions />}</div>
      </div>
    </header>
  );
};
