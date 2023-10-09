import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userHasAccessToProject } from '@/lib/project';

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
    taskId: z.string()
  })
});

export async function PATCH(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    await prisma.task.update({
      where: {
        id: params.taskId,
        projectId: params.projectId
      },
      data: {
        deletedAt: new Date()
      }
    });

    await prisma.project.update({
      where: {
        id: params.projectId
      },
      data: {
        updatedAt: new Date()
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
