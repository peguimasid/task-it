'use client';

import { useMemo } from 'react';
import { READABLE_STATUS, TASK_STATUS_ICONS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { CreateTaskButton } from './create-task-button';
import { TaskStack } from './task-stack';
import { Badge } from './ui/badge';

interface StatusColumnProps {
  data: Task[];
  status: TaskStatus;
}

export const StatusColumn = ({ status, data }: StatusColumnProps) => {
  const title = READABLE_STATUS[status];
  const Icon = TASK_STATUS_ICONS[status];

  const tasks = useMemo(() => {
    return data?.filter((task) => task.status === status) ?? [];
  }, [data, status]);

  return (
    <div className="h-full w-[350px] min-w-[350px] overflow-hidden rounded-lg border border-secondary bg-secondary">
      <div className="flex w-full flex-row items-center justify-between rounded-t-lg bg-card p-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <h1 className="font-semibold">{title}</h1>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <CreateTaskButton variant="ghost" className="h-7 w-7" />
      </div>
      <Droppable droppableId={status}>
        {(provided) => <TaskStack {...provided.droppableProps} tasks={tasks} provided={provided} />}
      </Droppable>
    </div>
  );
};
