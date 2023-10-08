import { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { UserMenu } from '@/components/user-menu';

interface PageProps {
  children: ReactNode;
  params: { projectId: string };
}

const findProjectById = async (projectId: string): Promise<Project | null> => {
  const session = await getServerAuthSession();

  if (!session) return null;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session?.user?.id
    }
  });

  return project;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await findProjectById(params.projectId);

  if (!project) {
    return {};
  }

  return {
    title: project?.name
  };
}

export default async function ProjectLayout({ children, params: { projectId } }: PageProps) {
  const project = await findProjectById(projectId);

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex min-h-[100dvh] w-full scroll-mt-64 flex-col">
      <header className="sticky inset-0 z-10 flex h-16 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-full w-full max-w-6xl items-center justify-between">
          <Button asChild variant="ghost" className="-ml-4">
            <Link href="/projects">
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <UserMenu />
        </div>
      </header>
      <div className="grid flex-1">
        <main className="container max-w-6xl flex-1 overflow-hidden py-5">{children}</main>
      </div>
    </div>
  );
}
