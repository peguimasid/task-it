import Link from 'next/link';

import { Skeleton } from '@/components/ui/skeleton';
import { CreateProjectButton } from '@/components/create-project-button';
import { Icons } from '@/components/icons';
import { TopBar } from '@/components/top-bar';
import { UserMenu } from '@/components/user-menu';

export default async function Loading() {
  return (
    <main className="flex min-h-[100dvh] w-full flex-col">
      <TopBar>
        <div className="mx-auto flex w-full max-w-4xl flex-row items-center px-5">
          <Link as="/" href="/" className="flex flex-row items-center justify-center gap-1">
            <Icons.logo className="h-6 w-6" />
            <h1 className="font-heading text-xl font-extrabold">task-it</h1>
          </Link>
          <div className="ml-auto flex flex-row space-x-4">
            <UserMenu />
          </div>
        </div>
      </TopBar>
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col p-5">
        <div className="space-y-8 py-4">
          <section className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <h1 className="font-heading text-3xl md:text-4xl">Projects</h1>
              <p className="text-lg text-muted-foreground">Create and manage projects</p>
            </div>
            <CreateProjectButton className="pointer-events-none" />
          </section>
          <div className="divide-y divide-border rounded-md border">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div className="grid w-full gap-3">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
