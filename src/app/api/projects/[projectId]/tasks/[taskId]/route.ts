import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userHasAccessToProject } from '@/lib/utils/project';
import { taskPutSchema } from '@/lib/validations/task';

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string(),
    taskId: z.string()
  })
});

export async function PUT(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const { projectId, taskId } = params;

    const userCanAccessProject = await userHasAccessToProject(projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    const currentTask = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    });

    const json = await request.json();
    const updatedData = taskPutSchema.parse(json);

    const changedStatus = currentTask?.status !== updatedData.status;

    if (changedStatus) {
      await prisma.task.updateMany({
        where: { status: { equals: updatedData.status } },
        data: { index: { increment: 1 } }
      });

      await prisma.task.updateMany({
        where: {
          status: { equals: currentTask?.status },
          index: { gt: 0 }
        },
        data: { index: { decrement: 1 } }
      });

      updatedData.index = 0;
    }

    const taskUpdated = await prisma.task.update({
      where: { id: taskId },
      data: updatedData
    });

    await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        updatedAt: new Date()
      }
    });

    return new Response(JSON.stringify({ taskUpdated }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    await prisma.task.delete({
      where: {
        id: params.taskId,
        projectId: params.projectId
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
