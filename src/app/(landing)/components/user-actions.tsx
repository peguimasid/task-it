'use client';

import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export const UserActions = () => {
  return (
    <div className="flex gap-2">
      <ModeToggle />
      <Button asChild variant="outline" className="px-8">
        <Link href="/signin">Login</Link>
      </Button>
    </div>
  );
};
