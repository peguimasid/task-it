import { ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/mode-toggle';
import { TopBar } from '@/components/top-bar';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <TopBar>
        <div className="container flex flex-row items-center">
          <Link as="/" href="/" className="flex flex-row items-center justify-center gap-1">
            <Icons.logo className="h-6 w-6" />
            <h1 className="font-heading text-xl font-extrabold">task-it</h1>
          </Link>
          <div className="ml-auto flex flex-row space-x-4">
            <div className="flex gap-2">
              <ModeToggle />
              <Button asChild variant="secondary">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </TopBar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
