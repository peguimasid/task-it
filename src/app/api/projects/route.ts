import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const sampleTasks = [
  {
    title: 'Create your first task',
    status: 'BACKLOG',
    index: 0,
    priority: 'Medium',
    tags: ['Beginner'],
    size: 'Small'
  },
  {
    title: 'Write your first task description',
    status: 'BACKLOG',
    index: 1,
    priority: 'Low',
    size: 'Large'
  },
  {
    title: 'Explore Task-it platform',
    status: 'IN_PROGRESS',
    index: 0,
    priority: 'High',
    tags: ['Explore'],
    size: 'Medium'
  },
  {
    title: 'Bring your project to life',
    status: 'DONE',
    index: 0,
    priority: 'Urgent',
    tags: ['Achievement'],
    size: 'Tiny'
  }
];

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
