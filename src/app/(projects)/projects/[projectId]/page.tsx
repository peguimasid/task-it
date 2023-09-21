import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { KanbanBoard } from '@/components/kanban-board';
import { ProjectShell } from '@/components/project-shell';

interface PageProps {
  params: { projectId: string };
}

const delay = async (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

const getProjectForUser = async (projectId: Project['id']) => {
  const session = await getServerAuthSession();

  if (!session) return null;

  await delay(3000);

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session?.user?.id
    },
    include: {
      tasks: true
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
      <KanbanBoard tasks={project.tasks} />
    </ProjectShell>
  );
}
