'use client';

import { Task } from '@prisma/client';

import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="h-20">
      <CardTitle className="text-md">{task.title}</CardTitle>
    </Card>
  );
};
