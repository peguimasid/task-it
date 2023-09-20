'use client';

import { READABLE_STATUS, TASK_STATUS_ICONS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Task } from '@prisma/client';
import { Plus } from 'lucide-react';

import { TaskCard } from './task-card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface StatusColumnProps {
  tasks: Task[];
  status: TaskStatus;
}

export const StatusColumn = ({ status, tasks }: StatusColumnProps) => {
  const title = READABLE_STATUS[status];
  const Icon = TASK_STATUS_ICONS[status];

  return (
    <div className="h-full w-[350px] min-w-[350px] bg-secondary rounded-lg border border-secondary">
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
      <div className="w-full space-y-3 p-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
