import { ReactNode } from 'react';

import { TopBar } from '@/components/top-bar';
import UserMenu from './components/user-menu';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={UserMenu} />
      {children}
    </main>
  );
}
