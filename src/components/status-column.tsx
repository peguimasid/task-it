'use client';

import { READABLE_STATUS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { Task } from '@prisma/client';

interface StatusColumnProps {
  tasks: Task[];
  status: TaskStatus;
}

export const StatusColumn = ({ status, tasks }: StatusColumnProps) => {
  const title = READABLE_STATUS[status];

  return (
    <div className="h-full min-w-[350px] space-y-3 rounded-sm bg-muted p-3">
      <div className="flex w-full flex-row justify-between">
        <h1>{title}</h1>
        <button>+</button>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className="h-20 w-full bg-blue-900">
          {task.title}
        </div>
      ))}
    </div>
  );
};
