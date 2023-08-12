import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface ProjectTopBarProps {
  project: Project;
  userActions?: FunctionComponent | null;
}

export const ProjectTopBar: FunctionComponent<ProjectTopBarProps> = ({ project, userActions: UserActions = null }) => {
  return (
    <header className="sticky inset-0 z-10 flex h-20 w-full border-b border-muted backdrop-blur-md">
      <div className="mx-auto flex w-full flex-row items-center justify-between px-5">
        <div className="flex items-center">
          <Icons.kanbanSquare className="h-6 w-6" />
          <Icons.chevronRight className="mx-2 h-4 w-4 text-zinc-400" />
          <Button asChild variant="link">
            <Link href="/" className="px-0 font-semibold">
              projects
            </Link>
          </Button>
          <Icons.chevronRight className="mx-2 h-4 w-4 text-zinc-400" />
          <h1 className="font-semibold">{project.name}</h1>
        </div>
        <div className="mr-5">{UserActions && <UserActions />}</div>
      </div>
    </header>
  );
};
