import { userCanAccessProject } from '@/lib/project-guard';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';
import { Metadata } from 'next';

interface PageProps {
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

export default async function Page({ params }: PageProps) {
  await userCanAccessProject(params.projectId);

  return (
    <main className="flex h-full">
      <h1>{params.projectId}</h1>
    </main>
  );
}
