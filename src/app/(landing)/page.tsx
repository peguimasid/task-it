import { Ubuntu } from 'next/font/google';

import { twMerge } from 'tailwind-merge';

import Link from 'next/link';

import { TopBar } from '@/components/top-bar';
import { Button } from '@/components/ui/button';
import { UserActions } from './components/user-actions';

import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Page() {
  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={UserActions} />
      <section className="container flex h-full max-w-[64rem] flex-col items-center gap-4 pt-6 text-center md:pb-12 md:pt-10 lg:py-32">
        <Link
          href={siteConfig.links.github}
          className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          target="_blank"
        >
          Follow along on Github
        </Link>
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Keep project management simple as should be.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Building the Ultimate Task Management App with Next.js 13.
          <br />
          Open Source, Every Step of the Way.
        </p>
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
