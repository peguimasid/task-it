import { ReactNode } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { TopBar } from '@/components/top-bar';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <TopBar>
        <div className="flex gap-2">
          <ModeToggle />
          <Button asChild variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </TopBar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
