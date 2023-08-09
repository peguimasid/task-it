'use client';

import { TopBar } from '@/components/top-bar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

import { signIn } from 'next-auth/react';

export const SignInPageContent = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={ModeToggle} />
      <section className="flex h-full items-center justify-center space-x-8 space-y-5 px-5">
        <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Continue with:</h1>
          <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
            <Button className="gap-2" variant="outline" onClick={() => signIn('google')}>
              <Icons.google className="h-4 w-4" />
              <p className="text-md">Google</p>
            </Button>
            <Button className="gap-2" variant="outline" onClick={() => signIn('github')}>
              <Icons.github className="h-4 w-4" />
              <p className="text-md">Github</p>
            </Button>
            <Button className="gap-2" variant="outline" onClick={() => signIn('github')}>
              <Icons.discord className="h-4 w-4" />
              <p className="text-md">Discord</p>
            </Button>
            <Button className="gap-2" variant="outline" onClick={() => signIn('facebook')}>
              <Icons.facebook className="h-4 w-4" />
              <p className="text-md">Facebook</p>
            </Button>
            <Button className="gap-2" variant="outline" onClick={() => signIn('42-school')}>
              <Icons.school42 className="h-4 w-4" />
              <p className="text-md">42 School</p>
            </Button>
            <Button className="gap-2" variant="outline" onClick={() => signIn('auth0')}>
              <Icons.auth0 className="h-4 w-4" />
              <p className="text-md">Auth0</p>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
