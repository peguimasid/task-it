import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { siteConfig } from '@/config/site';

export default function Page() {
  return (
    <>
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
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/signin">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
