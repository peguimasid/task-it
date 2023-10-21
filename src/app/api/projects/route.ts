import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const sampleTasks = [
  {
    title: 'Create your first task',
    status: 'BACKLOG',
    index: 0,
    priority: 'MEDIUM',
    tags: ['Beginner'],
    size: 'SMALL'
  },
  {
    title: 'Write your first task description',
    status: 'BACKLOG',
    index: 1,
    priority: 'LOW',
    size: 'LARGE'
  },
  {
    title: 'Explore Task-it platform',
    status: 'IN_PROGRESS',
    index: 0,
    priority: 'HIGH',
    tags: ['Explore'],
    size: 'MEDIUM'
  },
  {
    title: 'Bring your project to life',
    status: 'DONE',
    index: 0,
    priority: 'URGENT',
    tags: ['Achievement'],
    size: 'TINY'
  }
];

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { name } = await request.json();

  const newProject = await prisma.project.create({
    data: {
      name,
      user: {
        connect: {
          id: session.user.id
        }
      }
    }
  });

  const userProjectsCount = await prisma.project.count({
    where: {
      userId: session.user.id
    }
  });

  if (userProjectsCount === 1) {
    await prisma.task.createMany({
      data: sampleTasks.map((task) => ({ ...task, projectId: newProject.id }))
    });
  }

  return new Response(JSON.stringify({ newProject }));
}
