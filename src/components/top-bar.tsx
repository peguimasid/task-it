import { PropsWithChildren } from 'react';

export const TopBar = ({ children }: PropsWithChildren) => {
  return (
    <header className="sticky inset-0 z-10 flex h-16 w-full border-b bg-card/80 backdrop-blur-sm">{children}</header>
  );
};
