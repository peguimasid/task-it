'use client';

import { DroppableProvided } from '@hello-pangea/dnd';
import { Task } from '@prisma/client';

import { TaskCard } from './task-card';

interface TaskStackProps {
  tasks: Task[];
  provided: DroppableProvided;
}

export const TaskStack = ({ tasks, provided }: TaskStackProps) => {
  return (
    <div ref={provided.innerRef} className="flex flex-col h-full w-full p-3">
      {tasks.map((task, index) => (
        <TaskCard key={task.id} task={task} index={index} />
      ))}
      {provided.placeholder}
    </div>
  );
};
