import { notFound } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';

export const userCanAccessProject = async (projectId: string): Promise<void> => {
  const session = await getServerAuthSession();

  if (!session) {
    return notFound();
  }

  const findProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session.user.id
    }
  });

  if (!findProject) {
    return notFound();
  }
};
