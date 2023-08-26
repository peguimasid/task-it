import { PropsWithChildren } from 'react';

interface ProjectShellProps extends PropsWithChildren {
  title: string;
  description?: string;
}

export const ProjectShell = ({ title, description, children }: ProjectShellProps) => {
  return (
    <main className="flex h-full w-full flex-col space-y-5 px-5">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </main>
  );
};
