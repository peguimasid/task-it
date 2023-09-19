'use client';

import { useParams } from 'next/navigation';
import { statuses } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { StatusColumn } from './status-column';

interface FetchProjectTasksProps {
  queryKey: readonly unknown[] | [string];
}

const fetchProjectTasks = async ({ queryKey }: FetchProjectTasksProps): Promise<Task[]> => {
  const [, projectId] = queryKey;
  const response = await fetch(`/api/projects/${projectId}/tasks`);
  const responseData = await response.json();
  return responseData;
};

export const KanbanBoard = () => {
  const { projectId } = useParams();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['projectTasks', projectId],
    queryFn: fetchProjectTasks
  });

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks?.filter((task) => task.status === status) ?? [];
  };

  if (isLoading) {
    // TODO: Add Skeleton
    return (
      <div className="h-full w-full rounded-lg border">
        <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg border">
      <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
        {statuses.map((status) => (
          <StatusColumn key={status} status={status} tasks={getTasksByStatus(status)} />
        ))}
      </div>
    </div>
  );
};
