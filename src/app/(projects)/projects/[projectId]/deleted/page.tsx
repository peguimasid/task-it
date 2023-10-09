import { notFound } from 'next/navigation';
import { Project, Task } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { projectId: string };
}

type ProjectWithTasks = Project & {
  tasks: Task[];
};

const getProjectForUser = async (projectId: Project['id']): Promise<ProjectWithTasks | null> => {
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
    <main className="flex h-full w-full flex-col space-y-8">
      <section className="flex w-full items-center justify-between">
        <h1 className="font-heading text-3xl sm:text-4xl">Deleted Tasks</h1>
      </section>
    </main>
  );
}
