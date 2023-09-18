import { Project } from '@prisma/client';

import { getServerAuthSession } from './auth';
import { prisma } from './prisma';

export async function userHasAccessToProject(projectId: Project['id']): Promise<boolean> {
  const session = await getServerAuthSession();

  if (!session) return false;

  const count = await prisma.project.count({
    where: {
      id: projectId,
      userId: session.user.id
    }
  });

  return count > 0;
}
