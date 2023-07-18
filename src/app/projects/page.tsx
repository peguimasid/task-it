import { Metadata } from 'next';

import { white } from 'tailwindcss/colors';

import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/prisma';

import { format } from 'date-fns';

import { TopBar } from '@/components/top-bar';
import { UserMenu } from '@/components/projects/user-menu';
import Link from 'next/link';
import { PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons';

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

const Page = async () => {
  const session = await getServerAuthSession();

  const usersProjects = await getUserProjects();

  const currentDate = format(new Date(), 'MMMM dd, yyyy');

  const projectsText = `project${usersProjects?.length !== 1 ? 's' : ''}`;

  return (
    <main className="flex h-[100dvh] w-screen flex-col">
      <TopBar userActions={UserMenu} />
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-2">
        <div className="mt-10 space-y-2">
          <h1 className="text-4xl text-slate-50">Welcome back, {session?.user.name}</h1>
          <div className="flex flex-row divide-x-2 divide-zinc-800">
            <p className="pr-2 text-zinc-500">{currentDate}</p>
            <p className="pl-2 text-zinc-500">
              Recently viewed {usersProjects?.length} {projectsText}
            </p>
          </div>
          <div className="flex w-full items-center justify-end">
            <Link
              href="/projects/new"
              className="p flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-3 py-2 pr-5"
            >
              <PlusIcon className="scale-110" />
              <p>Create project</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
