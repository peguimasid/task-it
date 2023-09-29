'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import { TagsList } from './tags-list';
import { Button } from './ui/button';
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
          <CardTitle className="text-sm">{task.title}</CardTitle>
          <TagsList priority={task.priority} size={task.size} tags={task.tags} />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-0 m-3 h-6 w-6 opacity-0 transition group-hover:opacity-100"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </Card>
      )}
    </Draggable>
  );
};
