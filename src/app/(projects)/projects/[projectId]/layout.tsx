import { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SidebarNavItem } from '@/types';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { ProjectNav } from '@/components/nav';
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

  const sidebarItems: SidebarNavItem[] = [
    {
      title: 'Tasks',
      href: `/projects/${projectId}`,
      icon: 'kanbanSquare'
    },
    {
      title: 'Settings',
      href: `/projects/${projectId}/settings`,
      icon: 'settings'
    }
  ];

  return (
    <div className="flex min-h-[100dvh] w-full flex-col">
      <header className="sticky inset-0 z-10 flex h-20 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex w-full flex-row items-center justify-between px-5">
          <div className="flex items-center">
            <Icons.logo className="h-6 w-6" />
            <Icons.chevronRight className="mx-2 h-4 w-4 text-zinc-400" />
            <Button asChild variant="link">
              <Link href="/" className="!px-0 font-semibold">
                projects
              </Link>
            </Button>
            <Icons.chevronRight className="mx-2 h-4 w-4 text-zinc-400" />
            <Button asChild variant="link">
              <Link href={`/projects/${projectId}`} className="!px-0 font-semibold">
                {project.name}
              </Link>
            </Button>
          </div>
          <UserMenu />
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[300px_1fr]">
        <aside className="sticky top-20 hidden w-full flex-col self-start py-5 pl-5 md:flex">
          <ProjectNav items={sidebarItems} />
        </aside>
        <main className="flex-1 overflow-hidden py-5">{children}</main>
      </div>
    </div>
  );
}
