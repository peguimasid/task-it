import { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AuthProviderButtons } from '@/components/auth-provider-buttons';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Login'
};

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
          <AuthProviderButtons />
        </div>
      </div>
    </>
  );
}
