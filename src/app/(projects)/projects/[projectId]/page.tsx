import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { KanbanBoard } from '@/components/kanban-board';
import { ProjectSettingsButton } from '@/components/project-settings-button';

interface PageProps {
  params: { projectId: string };
}

const getProjectForUser = async (projectId: Project['id']) => {
  const session = await getServerAuthSession();

  if (!session) return null;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session?.user?.id
    },
    include: {
      tasks: {
        orderBy: { index: 'asc' },
        where: { deletedAt: null }
      }
    }
  });

  return project;
};

export default async function Page({ params }: PageProps) {
  const project = await getProjectForUser(params.projectId);

  if (!project) {
    return notFound();
  }

  return (
    <main className="flex h-full w-full flex-col space-y-8 pt-4">
      <section className="flex w-full items-center justify-between">
        <h1 className="font-heading text-3xl sm:text-4xl">{project.name}</h1>
        <ProjectSettingsButton project={project} variant="ghost" />
      </section>
      <KanbanBoard projectId={project.id} tasks={project.tasks} />
    </main>
  );
}
