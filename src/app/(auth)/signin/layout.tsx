import { ReactNode } from 'react';
import { Metadata } from 'next';

import { ModeToggle } from '@/components/mode-toggle';
import { TopBar } from '@/components/top-bar';

export const metadata: Metadata = {
  title: 'Task-it | SignIn'
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={ModeToggle} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
