import { Metadata } from 'next';

import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CreateProjectButton } from '@/components/create-project-button';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { ProjectItem } from '@/components/project-item';
import { TopBar } from '@/components/top-bar';
import { UserMenu } from '@/components/user-menu';

export const metadata: Metadata = {
  title: 'Projects'
};

const getUserProjects = async () => {
  const session = await getServerAuthSession();

  if (!session) return null;

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return projects;
};

export default async function Page() {
  const projects = await getUserProjects();

  return (
    <main className="flex min-h-[100dvh] w-full flex-col">
      <TopBar>
        <UserMenu />
      </TopBar>
      <div className="mx-auto flex h-full w-full max-w-4xl flex-col p-5">
        <div className="space-y-8 py-4">
          <section className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <h1 className="font-heading text-3xl md:text-4xl">Projects</h1>
              <p className="text-lg text-muted-foreground">Create and manage projects</p>
            </div>
            <CreateProjectButton />
          </section>
          {projects?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {projects?.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="kanbanSquare" />
              <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                You don&apos;t have any project yet. Start by creating one.
              </EmptyPlaceholder.Description>
              <CreateProjectButton variant="outline" />
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </main>
  );
}
