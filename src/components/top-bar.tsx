import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';

export const TopBar = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky inset-0 z-10 flex h-20 w-full border-b backdrop-blur-md">
      <div className="container flex flex-row items-center">
        <Link as="/" href="/" className="flex flex-row items-center justify-center gap-1">
          <CheckSquare className="h-6 w-6" />
          <h1 className="font-heading text-xl font-extrabold">task-it</h1>
        </Link>
        <div className="ml-auto flex flex-row space-x-4">{children}</div>
      </div>
    </header>
  );
};
