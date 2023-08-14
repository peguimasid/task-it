import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[100dvh] w-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
