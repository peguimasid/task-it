import { notFound } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { projectId: string };
}

const getProjectForUser = async (projectId: Project['id']): Promise<Project | null> => {
  const session = await getServerAuthSession();

  if (!session) return null;

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
    <div className="flex h-full w-full">
      <main className="flex h-full flex-col space-y-5 overflow-hidden px-10">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl md:text-4xl">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="h-full w-full">
          <div className="flex h-full w-full space-x-4 overflow-x-auto py-3">
            <div className="h-full min-w-[300px] bg-zinc-800"></div>
            <div className="h-full min-w-[300px] bg-zinc-800"></div>
            <div className="h-full min-w-[300px] bg-zinc-800"></div>
            <div className="h-full min-w-[300px] bg-zinc-800"></div>
            <div className="h-full min-w-[300px] bg-zinc-800"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
