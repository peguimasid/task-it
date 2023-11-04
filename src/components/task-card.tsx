'use client';

import { useCallback } from 'react';
import { useTaskSheet } from '@/contexts/task-sheet-provider';
import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TagsList } from './tags-list';
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
          className="mb-3 min-h-[6rem] !cursor-pointer space-y-2 border-none p-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={openTaskSheet}
        >
          <CardTitle className="text-sm">{title}</CardTitle>
          <TagsList priority={priority as TaskPriority} size={size as TaskSize} tags={tags} />
        </Card>
      )}
    </Draggable>
  );
};
