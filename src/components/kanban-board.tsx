'use client';

import { useState } from 'react';
import { statuses } from '@/constants/task-statuses';
import { TaskStatus } from '@/types';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { StatusColumn } from './status-column';

interface KanbanBoardProps {
  tasks: Task[];
}

export const KanbanBoard = ({ tasks: initialState }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState(initialState);

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks?.filter((task) => task.status === status) ?? [];
  };

  const onDragEnd = (dropResult: DropResult) => {
    console.log(dropResult);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="h-full w-full rounded-lg border">
        <div className="flex h-full w-full gap-4 overflow-x-auto p-3">
          {statuses.map((status) => (
            <StatusColumn key={status} status={status} tasks={getTasksByStatus(status)} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
