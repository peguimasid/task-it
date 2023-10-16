'use client';

import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TagsList } from './tags-list';
import { TaskCardTitle } from './task-card-title';
import { TaskOperations } from './task-operations';
import { Card } from './ui/card';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const { priority, size, tags } = task;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          className="group relative mb-3 min-h-[6rem] space-y-2 border-none p-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskCardTitle task={task} />
          <TagsList priority={priority as TaskPriority} size={size as TaskSize} tags={tags} />
          <TaskOperations task={task} />
        </Card>
      )}
    </Draggable>
  );
};
