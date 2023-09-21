'use client';

import { statuses } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Task } from '@prisma/client';

import { StatusColumn } from './status-column';

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard = ({ tasks }: KanbanBoardProps) => {
  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks?.filter((task) => task.status === status) ?? [];
  };

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
