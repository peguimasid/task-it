'use client';

import Link from 'next/link';
import { Task } from '@prisma/client';
import { Anchor, Bell, MoreHorizontal } from 'lucide-react';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardTitle } from './ui/card';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="min-h-[6rem] p-3 group space-y-2 relative">
      <CardTitle className="text-sm">{task.title}</CardTitle>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary">
          <Bell className="w-3 h-3 mr-1" />
          {task.priority}
        </Badge>
        <Badge variant="secondary">
          <Anchor className="w-3 h-3 mr-1" />
          {task.size}
        </Badge>
        {task.tags?.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
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
