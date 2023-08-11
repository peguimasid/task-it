import { ReactNode } from 'react';
import { Metadata } from 'next';

import { prisma } from '@/server/prisma';

import { getServerAuthSession } from '@/server/auth';
import { userCanAccessProject } from '@/lib/project-guard';

import { SidebarNavItem } from '@/types';

import { DashboardNav } from '@/components/nav';

interface PageProps {
  children: ReactNode;
  params: { projectId: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const session = await getServerAuthSession();

  if (!session) {
    return {
      title: '404 | Not Found'
    };
  }

  const { projectId } = params;

  const findProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session.user.id
    }
  });

  return {
    title: `Task-it | ${findProject?.name}`
  };
}

export default async function ProjectLayout({ children, params: { projectId } }: PageProps) {
  await userCanAccessProject(projectId);

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
    <div className="grid flex-1 gap-10 p-3 md:grid-cols-[250px_1fr]">
      <aside className="hidden w-[250px] flex-col md:flex">
        <DashboardNav items={sidebarItems} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
