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
          className="min-h-[6rem] p-3 group space-y-2 relative"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardTitle className="text-sm">{task.title}</CardTitle>
          <TagsList priority={task.priority} size={task.size} tags={task.tags} />
          <Button
            variant="outline"
            size="icon"
            className="w-6 h-6 absolute opacity-0 top-0 right-0 group-hover:opacity-100 transition m-3"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </Card>
      )}
    </Draggable>
  );
};
