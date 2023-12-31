import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

export const ProjectItem: FunctionComponent<ProjectCardProps> = ({ project }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid w-full gap-1">
        <Link href={`/projects/${project.id}`} className="font-semibold hover:underline">
          {project.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};
