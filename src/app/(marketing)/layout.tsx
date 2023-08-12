import { ReactNode } from 'react';

import { TopBar } from '@/components/top-bar';
import { UserActions } from './components/user-actions';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <TopBar userActions={UserActions} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
