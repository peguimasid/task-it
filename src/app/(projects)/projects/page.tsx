import { Metadata } from 'next';
import { format } from 'date-fns';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Separator } from '@/components/ui/separator';
import { TopBar } from '@/components/top-bar';

import { CreateProjectDialog } from './components/create-project-dialog';
import { ProjectCard } from './components/project-card';
import { UserMenu } from './components/user-menu';

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

  return (
    <main className="flex min-h-[100dvh] w-full flex-col">
      <TopBar userActions={UserMenu} />
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-5 py-10">
        <div className="space-y-4 py-4">
          <section className="space-y-2">
            <h1 className="truncate text-2xl md:text-4xl">Welcome back, {session?.user.name}</h1>
            <div className="flex h-5 items-center space-x-2 text-sm md:text-base">
              <div>{currentDate}</div>
              <Separator orientation="vertical" />
              <div>
                Recently viewed {usersProjects?.length} project{usersProjects?.length !== 1 ? 's' : ''}
              </div>
            </div>
          </section>
          <section className="flex w-full items-center justify-end py-5 md:py-0">
            <CreateProjectDialog />
          </section>
          <section className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {usersProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
