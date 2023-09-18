import { z } from 'zod';

import { userHasAccessToProject } from '@/lib/project';

const routeContextSchema = z.object({
  params: z.object({
    projectId: z.string()
  })
});

export async function GET(request: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    const { params } = routeContextSchema.parse(context);

    const userCanAccessProject = await userHasAccessToProject(params.projectId);

    if (!userCanAccessProject) {
      return new Response('You cannot access this route', { status: 403 });
    }

    // return 'ok';

    return new Response('ok', { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
