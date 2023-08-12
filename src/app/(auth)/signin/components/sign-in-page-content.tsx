'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/mode-toggle';
import { TopBar } from '@/components/top-bar';

export const SignInPageContent = () => {
  return (
    <main className="flex min-h-[100dvh] w-screen flex-col">
      <TopBar userActions={ModeToggle} />
      <section className="container mx-auto flex flex-1 items-center justify-center px-5">
        <div className="flex h-full w-full max-w-sm flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Continue with:</h1>
          <div className="flex h-full w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('google')}>
              <Icons.google className="h-5 w-5" />
              <p className="text-md">Google</p>
            </Button>
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('github')}>
              <Icons.github className="h-5 w-5" />
              <p className="text-md">Github</p>
            </Button>
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('github')}>
              <Icons.discord className="h-5 w-5" />
              <p className="text-md">Discord</p>
            </Button>
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('facebook')}>
              <Icons.facebook className="h-5 w-5" />
              <p className="text-md">Facebook</p>
            </Button>
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('42-school')}>
              <Icons.school42 className="h-5 w-5" />
              <p className="text-md">42 School</p>
            </Button>
            <Button className="gap-2" variant="outline" size="lg" onClick={() => signIn('auth0')}>
              <Icons.auth0 className="h-5 w-5" />
              <p className="text-md">Auth0</p>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
