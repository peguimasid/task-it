import { FunctionComponent } from 'react';

import { Project } from '@prisma/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Kanban } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({ project }) => {
  // const projectPageLink = `/projects/${project.id}`;

  return (
    <Card className="min-h-[10rem]">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium">
          {project.name}
        </CardTitle>
        <Kanban className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="line-clamp-4 text-muted-foreground">{project.description}</div>
      </CardContent>
    </Card>
  );
};
