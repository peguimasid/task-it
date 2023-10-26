'use client';

import { MouseEventHandler, useCallback } from 'react';
import { useTaskSheet } from '@/contexts/task-sheet-provider';
import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TagsList } from './tags-list';
import { TaskOperations } from './task-operations';
import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const { openSheet } = useTaskSheet();
  const { title, priority, size, tags } = task;

  const openTaskSheet = useCallback(() => {
    openSheet(task.id);
  }, [openSheet, task.id]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          className="group relative mb-3 min-h-[6rem] space-y-2 border-none p-3"
          onClick={openTaskSheet}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardTitle className="text-sm">{title}</CardTitle>
          <TagsList priority={priority as TaskPriority} size={size as TaskSize} tags={tags} />
          <TaskOperations task={task} />
        </Card>
      )}
    </Draggable>
  );
};
