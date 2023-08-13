'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function Page() {
  return (
    <>
      <div className="relative h-full w-full">
        <Button asChild variant="ghost" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Link href="/">
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="container flex h-full max-w-md flex-col items-center justify-center space-y-6">
          <div className="flex w-full flex-col items-center space-y-2">
            <Icons.logo className="h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in with your preferred provider</p>
          </div>
          <div className="flex w-full flex-col space-y-3 rounded-lg border border-solid border-muted p-5">
            <Button className="gap-2" variant="secondary" onClick={() => signIn('google')}>
              <Icons.google className="h-5 w-5" />
              <p>Google</p>
            </Button>
            <Button className="gap-2" variant="secondary" onClick={() => signIn('github')}>
              <Icons.github className="h-5 w-5" />
              <p>Github</p>
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="flex w-full flex-row justify-center space-x-3">
              <Button className="gap-2" variant="secondary" size="icon" onClick={() => signIn('discord')}>
                <Icons.discord className="h-5 w-5" />
              </Button>
              <Button className="gap-2" variant="secondary" size="icon" onClick={() => signIn('facebook')}>
                <Icons.facebook className="h-5 w-5" />
              </Button>
              <Button className="gap-2" variant="secondary" size="icon" onClick={() => signIn('42-school')}>
                <Icons.school42 className="h-5 w-5" />
              </Button>
              <Button className="gap-2" variant="secondary" size="icon" onClick={() => signIn('auth0')}>
                <Icons.auth0 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
