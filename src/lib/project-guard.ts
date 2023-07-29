import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';

import { notFound } from 'next/navigation';

export const userCanAccessProject = async (projectId: string): Promise<void> => {
  const session = await getServerAuthSession();

  if (!session) {
    return notFound();
  }

  const findProject = await prisma.project.findFirst({
    where: {
      id: projectId,
      AND: {
        userId: session.user.id
      }
    }
  });

  if (!findProject) {
    return notFound();
  }
};
