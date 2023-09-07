import { FunctionComponent } from 'react';
import { Project } from '@prisma/client';

import { CreateProjectButton } from './create-project-button';
import { EmptyPlaceholder } from './empty-placeholder';
import { ProjectItem } from './project-item';

interface ProjectListProps {
  projects: Project[] | null;
}

export const ProjectList: FunctionComponent<ProjectListProps> = ({ projects }) => {
  if (!projects?.length) {
    return (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="kanbanSquare" />
        <EmptyPlaceholder.Title>No projects created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any project yet. Start by creating one.
        </EmptyPlaceholder.Description>
        <CreateProjectButton variant="outline" />
      </EmptyPlaceholder>
    );
  }

  return (
    <div className="divide-y divide-border rounded-md border">
      {projects?.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};
