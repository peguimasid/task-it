'use client';

import { useState } from 'react';
import { statuses } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { reorderTasksOnDrop } from '@/utils/dnd/reorders-tasks-on-drop';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { StatusColumn } from './status-column';

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard = ({ tasks: initialState }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState(initialState);

  const onDragEnd = (dropResult: DropResult) => {
    const reorderedTasks = reorderTasksOnDrop(dropResult, tasks);
    if (!reorderedTasks?.length) return;
    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-full w-full rounded-lg border">
        <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
          {statuses.map((status) => (
            <StatusColumn key={status} status={status} data={tasks} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
