import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';
import { ChevronRight, Kanban } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  const projectPageLink = `/projects/${project.id}`;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="truncate text-base font-medium">{project.name}</CardTitle>
        <Kanban className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2 text-muted-foreground">{project.description}</div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="secondary" className="flex w-full justify-between">
          <Link href={projectPageLink}>
            <p>Go to project</p>
            <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
