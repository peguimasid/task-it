'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { EditTaskButton } from './edit-task-button';
import { TagsList } from './tags-list';
import { TaskOperations } from './task-operations';
import { Card } from './ui/card';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          className="group relative mb-3 min-h-[6rem] space-y-2 border-none p-3"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <EditTaskButton task={task} />
          <TagsList priority={task.priority} size={task.size} tags={task.tags} />
          <TaskOperations task={task} />
        </Card>
      )}
    </Draggable>
  );
};
