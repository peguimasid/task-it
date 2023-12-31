import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
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
              <Link href="/login">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
