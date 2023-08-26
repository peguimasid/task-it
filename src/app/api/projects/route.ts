import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { name, description } = await request.json();

  const newProject = await prisma.project.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  });

  return new Response(JSON.stringify({ newProject }));
}
