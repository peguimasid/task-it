'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export const UserActions = () => {
  return (
    <div className="flex gap-2">
      <ModeToggle />
      <Button asChild variant="secondary">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};
