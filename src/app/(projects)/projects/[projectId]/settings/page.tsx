import { redirect } from 'next/navigation';
import { Project } from '@prisma/client';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DeleteProjectButton } from '@/components/delete-project-button';
import { ProjectShell } from '@/components/project-shell';
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
    <ProjectShell title="Settings" description="Mange project settings">
      <UpdateProjectDataForm project={project} />
      <DeleteProjectButton project={project} className="w-36" />
    </ProjectShell>
  );
}
