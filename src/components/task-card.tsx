'use client';

import { useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { TaskPriority, TaskSize } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { createUrl } from '@/lib/utils';

import { TagsList } from './tags-list';
import { TaskOperations } from './task-operations';
import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId }: { projectId: string } = useParams();

  const { title, priority, size, tags } = task;

  const openTaskSheet = useCallback(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('view', task.id);

    router.push(createUrl(`/projects/${projectId}`, newParams));
  }, [projectId, router, searchParams, task.id]);

  return (
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
  );
};
