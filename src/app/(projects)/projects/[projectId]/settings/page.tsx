import { redirect } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { UpdateProjectDataForm } from '@/components/update-project-data-form';

interface PageProps {
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

export default async function Page({ params }: PageProps) {
  const project = await findProjectById(params.projectId);

  if (!project) {
    redirect('/projects');
  }

  return (
    <main className="flex h-full flex-col space-y-5 px-10 md:pl-0 md:pr-10">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl md:text-4xl">Settings</h1>
        <p className="text-lg text-muted-foreground">Mange project settings</p>
      </div>
      <UpdateProjectDataForm project={project} />
    </main>
  );
}
