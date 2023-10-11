import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { userHasAccessToProject } from '@/lib/utils/project';
import { taskPatchSchema, taskPostSchema } from '@/lib/validations/task';

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string()
  })
});

export async function POST(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    const json = await request.json();
    const { title, status } = taskPostSchema.parse(json);

    await prisma.task.updateMany({
      where: {
        projectId: params.projectId,
        status: { equals: status }
      },
      data: { index: { increment: 1 } }
    });

    const newTask = await prisma.task.create({
      data: {
        title,
        status,
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

    return new Response(JSON.stringify({ newTask }), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    const json = await request.json();
    const { tasks } = taskPatchSchema.parse(json);

    const updateTasksPromises = tasks.map(({ id, index, status }) => {
      return prisma.task.update({
        where: { id },
        data: { index, status }
      });
    });

    await prisma.$transaction(updateTasksPromises);

    await prisma.project.update({
      where: {
        id: params.projectId
      },
      data: {
        updatedAt: new Date()
      }
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
