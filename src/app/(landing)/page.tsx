import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import Link from 'next/link';

import { TopBar } from '@/components/top-bar';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckSquare } from 'lucide-react';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

const SignInButton = () => {
  return (
    <Button asChild variant="outline" className="px-10">
      <Link href="/signin">Login</Link>
    </Button>
  );
};

export default function Page() {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={SignInButton} />
      <section className="flex h-full flex-col items-center justify-center space-y-12">
        <div className="flex flex-col items-center justify-center space-y-3 px-5">
          <div className="flex items-center justify-center space-x-4">
            <h1 className={twMerge('text-3xl font-extrabold sm:text-5xl md:text-6xl', ubuntu.className)}>
              Welcome to Task-it
            </h1>
            <CheckSquare className="h-10 w-10 md:h-14 md:w-14" />
          </div>
          <p className="text-center text-muted-foreground md:text-lg">Keep project management simple as should be</p>
        </div>
        <Button asChild size="lg">
          <Link href="/signin" className="gap-2">
            <p>Sign up for free</p>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
