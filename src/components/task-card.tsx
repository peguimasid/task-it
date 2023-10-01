'use client';

import Link from 'next/link';
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
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          className="group relative mb-3 min-h-[6rem] space-y-2 p-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link
            href={{ query: { task: task.id } }}
            className="text-sm font-semibold leading-none tracking-tight hover:underline"
          >
            {task.title}
          </Link>
          <TagsList priority={task.priority} size={task.size} tags={task.tags} />
          <TaskOperations task={task} />
        </Card>
      )}
    </Draggable>
  );
};
