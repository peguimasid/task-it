import { Project } from '@prisma/client';
import { z } from 'zod';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { projectPatchSchema } from '@/lib/validations/project';

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string()
  })
});

export async function PATCH(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    const json = await request.json();
    const { name, description } = projectPatchSchema.parse(json);

    await prisma.project.update({
      where: {
        id: params.projectId
      },
      data: {
        name,
        description
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

export async function DELETE(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    await prisma.project.delete({
      where: {
        id: params.projectId
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

async function userHasAccessToProject(projectId: Project['id']): Promise<boolean> {
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
