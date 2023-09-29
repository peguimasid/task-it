'use client';

import { useMemo } from 'react';
import { READABLE_STATUS, TASK_STATUS_ICONS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';
import { Plus } from 'lucide-react';

import { TaskStack } from './task-stack';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface StatusColumnProps {
  data: Task[];
  status: TaskStatus;
}

export const StatusColumn = ({ status, data }: StatusColumnProps) => {
  const title = READABLE_STATUS[status];
  const Icon = TASK_STATUS_ICONS[status];

  const tasks = data?.filter((task) => task.status === status) ?? [];

  return (
    <div className="h-full w-[350px] min-w-[350px] bg-secondary rounded-lg border border-secondary overflow-hidden">
      <div className="flex w-full bg-card rounded-t-lg flex-row items-center justify-between p-3">
        <div className="flex gap-2 items-center">
          <Icon className="w-4 h-4" />
          <h1 className="font-semibold">{title}</h1>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Droppable droppableId={status}>
        {(provided) => <TaskStack {...provided.droppableProps} tasks={tasks} provided={provided} />}
      </Droppable>
    </div>
  );
};
