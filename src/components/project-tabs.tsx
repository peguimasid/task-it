'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Project, Task } from '@prisma/client';

import { createUrl } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KanbanBoard } from '@/components/kanban-board';

type ProjectWithTasks = Project & {
  tasks: Task[];
};

interface ProjectTabsProps {
  project: ProjectWithTasks;
}

export const ProjectTabs = ({ project }: ProjectTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') ?? 'tasks';

  const onTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', value);
    router.replace(createUrl(pathname, newParams));
  };

  return (
    <Tabs defaultValue={tab} onValueChange={onTabChange} className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between pb-3">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="tasks"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="tasks" className="flex-1">
        <KanbanBoard projectId={project.id} tasks={project.tasks} />
      </TabsContent>
      <TabsContent value="overview" className="flex-1 space-y-3">
        <h1>Overview</h1>
      </TabsContent>
    </Tabs>
  );
};
