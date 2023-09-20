'use client';

import { Task } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';

import { Button } from './ui/button';
import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="min-h-[7rem] p-3 group relative">
      <CardTitle className="text-sm">{task.title}</CardTitle>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6 absolute opacity-0 top-0 right-0 group-hover:opacity-100 transition m-3"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </Card>
  );
};
