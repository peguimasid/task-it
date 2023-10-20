'use client';

import { useCallback, useState } from 'react';
import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TagsList } from './tags-list';
import { TaskOperations } from './task-operations';
import { TaskSheet } from './task-sheet';
import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const { title, priority, size, tags } = task;

  const [isTaskSheetOpen, setIsTaskSheetOpen] = useState<boolean>(false);

  const openTaskSheet = useCallback(() => {
    setIsTaskSheetOpen(true);
  }, []);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Card
            className="group relative mb-3 min-h-[6rem] space-y-2 border-none p-3"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardTitle className="cursor-pointer text-sm hover:underline" onClick={openTaskSheet}>
              {title}
            </CardTitle>
            <TagsList priority={priority as TaskPriority} size={size as TaskSize} tags={tags} />
            <TaskOperations task={task} />
          </Card>
        )}
      </Draggable>
      <TaskSheet task={task} isSheetOpen={isTaskSheetOpen} onSheetOpenChange={setIsTaskSheetOpen} />
    </>
  );
};
