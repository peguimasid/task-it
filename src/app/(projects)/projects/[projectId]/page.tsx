import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { KanbanBoard } from '@/components/kanban-board';
import { ProjectShell } from '@/components/project-shell';

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
    <ProjectShell title={project.name} description={project.description}>
      <KanbanBoard projectId={project.id} tasks={project.tasks} />
    </ProjectShell>
  );
}
