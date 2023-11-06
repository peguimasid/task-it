'use client';

import { KeyboardEvent, useCallback } from 'react';
import { useTaskSheet } from '@/contexts/task-sheet-provider';
import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TagsList } from './tags-list';
import { TaskContextMenuContent } from './task-context-menu-content';
import { Card, CardTitle } from './ui/card';
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu';

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        openTaskSheet();
      }
    },
    [openTaskSheet]
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <ContextMenu>
          <ContextMenuTrigger>
            <Card
              className="mb-3 min-h-[6rem] !cursor-pointer space-y-2 border-none p-3"
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={openTaskSheet}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <CardTitle className="text-sm">{title}</CardTitle>
              <TagsList priority={priority as TaskPriority} size={size as TaskSize} tags={tags} />
            </Card>
          </ContextMenuTrigger>
          <TaskContextMenuContent task={task} />
        </ContextMenu>
      )}
    </Draggable>
  );
};
