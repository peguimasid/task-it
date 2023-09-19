'use client';

import { READABLE_STATUS } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';

interface StatusColumnProps {
  status: TaskStatus;
}

export const StatusColumn = ({ status }: StatusColumnProps) => {
  const title = READABLE_STATUS[status];

  return (
    <div className="h-full min-w-[300px] space-y-3 rounded-sm bg-muted p-3">
      <div className="flex w-full flex-row justify-between">
        <h1>{title}</h1>
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
  );
};
