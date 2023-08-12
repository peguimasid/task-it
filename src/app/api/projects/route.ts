import { NextResponse } from 'next/server';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';

export async function POST(request: Request) {
  const session = await getServerAuthSession();

  if (!session) return null;

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

  return NextResponse.json({ newProject });
}
