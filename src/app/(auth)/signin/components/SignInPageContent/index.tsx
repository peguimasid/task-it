'use client';

import { TopBar } from '@/components/top-bar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react';

export const SignInPageContent = () => {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar />
      <section className="flex h-full items-center justify-center space-x-8 space-y-5 px-5">
        <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-3">
          <h1 className="text-2xl">Sign in to continue</h1>
          <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
            <Button className="gap-3" variant="secondary" onClick={() => signIn('google')}>
              <Icons.google className="h-5 w-5" />
              <p className="text-md">Continue with Google</p>
            </Button>
            <Button className="gap-3" variant="secondary" onClick={() => signIn('github')}>
              <Icons.github className="h-5 w-5" />
              <p className="text-md">Continue with Github</p>
            </Button>
            <Button className="gap-3" variant="secondary" onClick={() => signIn('github')}>
              <Icons.discord className="h-5 w-5" />
              <p className="text-md">Continue with Discord</p>
            </Button>
            <Button className="gap-3" variant="secondary" onClick={() => signIn('facebook')}>
              <Icons.facebook className="h-5 w-5" />
              <p className="text-md">Continue with Facebook</p>
            </Button>
            <Button className="gap-3" variant="secondary" onClick={() => signIn('42-school')}>
              <Icons.school42 className="h-5 w-5" />
              <p className="text-md">Continue with 42</p>
            </Button>
            <Button className="gap-3" variant="secondary" onClick={() => signIn('auth0')}>
              <Icons.auth0 className="h-5 w-5" />
              <p className="text-md">Continue with Auth0</p>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
