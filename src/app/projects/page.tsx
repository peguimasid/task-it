import { Metadata } from 'next';

import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';

import { format } from 'date-fns';

import { CreateProjectButton } from './_components/create-project-button';

export const metadata: Metadata = {
  title: 'Task-it | Projects'
};

const getUserProjects = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id
    }
  });

  return projects;
};

export default async function Page() {
  const session = await getServerAuthSession();

  const usersProjects = await getUserProjects();

  const currentDate = format(new Date(), 'MMMM dd, yyyy');

  const projectsText = `project${usersProjects?.length !== 1 ? 's' : ''}`;

  return (
    <main className="mx-auto flex h-full w-full max-w-4xl flex-col px-2">
      <div className="mt-10 space-y-2">
        <h1 className="text-4xl">Welcome back, {session?.user.name}</h1>
        <div className="flex flex-row divide-x-2 divide-zinc-800">
          <p className="pr-2 font-light">{currentDate}</p>
          <p className="pl-2 font-light">
            Recently viewed {usersProjects?.length} {projectsText}
          </p>
        </div>
        <div className="flex w-full items-center justify-end">
          <CreateProjectButton />
        </div>
      </div>
    </main>
  );
}
