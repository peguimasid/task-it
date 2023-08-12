import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';
import { SidebarNavItem } from '@/types';

import { userCanAccessProject } from '@/lib/project-guard';
import { DashboardNav } from '@/components/nav';

import { UserMenu } from '../components/user-menu';
import { ProjectTopBar } from './components/project-top-bar';

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

  const project = await prisma.project.findFirst({ where: { id: projectId } });

  if (!project) return null;

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
    <main className="flex min-h-[100dvh] w-full flex-col">
      <ProjectTopBar project={project} userActions={UserMenu} />
      <div className="grid flex-1 gap-10 pt-5 md:grid-cols-[300px_1fr]">
        <aside className="hidden w-[300px] flex-col pl-5 md:flex">
          <DashboardNav items={sidebarItems} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </main>
  );
}
