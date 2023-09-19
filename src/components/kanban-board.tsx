'use client';

import { useParams } from 'next/navigation';
import { TASK_STATUS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface FetchProjectTasksProps {
  queryKey: readonly unknown[] | [string];
}

type KanbanTask = Omit<Task, 'projectId' | 'createdAt' | 'updatedAt'>;

const statuses = Object.keys(TASK_STATUS) as TaskStatus[];

const fetchProjectTasks = async ({ queryKey }: FetchProjectTasksProps): Promise<KanbanTask[]> => {
  const [, projectId] = queryKey;
  const response = await fetch(`/api/projects/${projectId}/tasks`);
  const responseData = await response.json();
  return responseData;
};

export const KanbanBoard = () => {
  const { projectId } = useParams();

  const { data: tasks } = useQuery({
    queryKey: ['projectTasks', projectId],
    queryFn: fetchProjectTasks
  });

  return (
    <div className="h-full w-full rounded-lg border">
      <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
        <div className="h-full min-w-[300px] space-y-3 rounded-sm bg-muted p-3">
          <div className="flex w-full flex-row justify-between">
            <h1>TODO</h1>
            <button>+</button>
          </div>
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
          <div id="task" className="h-20 w-full bg-blue-900" />
        </div>
      </div>
    </div>
  );
};
